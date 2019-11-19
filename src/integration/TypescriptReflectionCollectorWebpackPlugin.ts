import {Project} from "ts-morph";
import {SourceFileEntryPoint} from "../entrypoints/SourceFileEntryPoint";
import {PackagingManager} from "../packaging/PackagingManager";
import {CodeGenerator} from "../codgen/CodeGenerator";
import {Compiler } from "webpack";
import * as RawModule from "webpack/lib/RawModule"
import {Inject} from "../dependencies/annotations/Inject";
import {StringsRepository} from "../repository/StringsRepository";
import {SimpleSchemaRepository} from "../repository/schema/FileSeparatedSchemaRepository";
import { compilation } from "webpack";
import {TypescriptReflectionCompilerPlugin} from "./TypescriptReflectionCompilerPlugin";
import {ClientCompiler} from "../clientcompiler/ClientCompiler";
import { Once } from "lodash-decorators";
import { RawSource } from "webpack-sources";

export class TypescriptReflectionCollectorWebpackPlugin {

	private static REFLECTION_PLUGIN_NAME = "REFLECTION_PLUGIN_NAME";

	public static createWebpackLoader(loaderName: string) {
		const compilerPlugin = new TypescriptReflectionCompilerPlugin();

		const getCustomTransformers = (program) => ({
			before: [compilerPlugin.before(program)]
		});

		const options = {
			getCustomTransformers
		};

		return  {
			loader: loaderName,
			options
		}
	}

	@Inject
	private codgen: CodeGenerator;

	@Inject
	private clientCompiler: ClientCompiler;

	private project = new Project({
		tsConfigFilePath: "./tsconfig.json"
	});

	public apply(compiler: Compiler) {

		this.createReflectionApiLoading(compiler);

		this.tapOptimizeChunkAssets(compiler, (compilation, chunks) => {
			if (!this.isMainCompiler(compilation.compiler)) {
				return;
			}
			const mainChunk = this.findMainChunk(chunks);
			const metadataFilename = this.getMetadataFilename();
			compilation.assets[metadataFilename] = new RawSource(this.getSource());
			mainChunk.files.unshift(metadataFilename);
		});
	}

	private findMainChunk(chunks: Array<compilation.Chunk>) {
		return chunks.find(it => this.isMainChunkName(it.name))
	}


	private createReflectionApiLoading(compiler: Compiler) {
		compiler.hooks.compilation.tap(TypescriptReflectionCollectorWebpackPlugin.REFLECTION_PLUGIN_NAME, (_, factories) => {
			factories.normalModuleFactory.hooks.factory.tap(TypescriptReflectionCollectorWebpackPlugin.REFLECTION_PLUGIN_NAME, (factory) => {
				return (data, cb) => {
					if (this.isReflectionApiModuleRequest(data.request)) {
						this.addReflectionAliModule(cb);
					} else {
						factory(data, cb);
					}
				}
			});
		});
	}

	private isReflectionApiModuleRequest(name: string) {
		return name === ClientCompiler.LIB_NAME;
	}

	private async addReflectionAliModule(callback: (err: Error | null, data: unknown | null) => void) {
		try {
			const source = await this.getClientSource();
			callback(null, new RawModule(source, ClientCompiler.LIB_NAME, ClientCompiler.LIB_NAME));
		} catch (error) {
			callback(error, null);
		}
	}

	private tapOptimizeChunkAssets(compiler: Compiler, callback: (compilation: compilation.Compilation, chunks: Array<compilation.Chunk>) => void) {
		compiler.hooks.compilation.tap(TypescriptReflectionCollectorWebpackPlugin.REFLECTION_PLUGIN_NAME, compilation => {
			compilation.hooks.optimizeChunkAssets.tap(TypescriptReflectionCollectorWebpackPlugin.REFLECTION_PLUGIN_NAME, (chunks) => {
				callback(compilation, chunks);
			});
		});
	}

	@Once()
	private getClientSource(): Promise<string> {
		return this.clientCompiler.compileAndGetOutput()
	}

	private getSource(): string {
		const entryPoint = this.getEntryPoint();
		const packagingManager = this.getPackagingManager();

		this.project.getSourceFiles().forEach((sf) => {
			entryPoint.start(sf);
		});

		const schemas = entryPoint.getRepository().values();
		const packages = packagingManager.packAll(schemas);

		const packagesDefs = this.codgen.createPackagesDefinition(packages);
		const names = this.codgen.createStringsDefinition(packagingManager.getStringsRepository().toJson());
		const rvc = this.codgen.getRVC();

		return this.codgen.separateToSeveralLines(rvc, names, packagesDefs);
	}

	private getEntryPoint() {
		return new SourceFileEntryPoint(this.project, new SimpleSchemaRepository());
	}

	private getPackagingManager() {
		return new PackagingManager(StringsRepository.empty());
	}

	private isMainChunkName(name: string): boolean {
		return name === this.getMainChunkName();
	}

	private getMainChunkName(): string {
		return "main" //todo: use from config
	}

	private getMetadataFilename() {
		return 'metadata.js'; //todo: use from config
	}

	private isMainCompiler(compiler: Compiler) {
		return !compiler.isChild();
	}
}