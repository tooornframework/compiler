import {Project} from "ts-morph";
import {SourceFileEntryPoint} from "collector/entrypoints/SourceFileEntryPoint";
import {PackagingManager} from "common/packaging/PackagingManager";
import {CodeGenerator} from "collector/codgen/CodeGenerator";
import {Compiler } from "webpack";
import {Inject} from "common/dependencies/annotations/Inject";
import {StringsRepository} from "common/repository/StringsRepository";
import {UniqSimpleSchemaRepository} from "common/repository/schema/FileSeparatedSchemaRepository";
import { compilation } from "webpack";
import {TypescriptReflectionCompilerPlugin} from "collector/integration/TypescriptReflectionCompilerPlugin";
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

	private project = new Project({
		tsConfigFilePath: "./tsconfig.json"
	});

	public apply(compiler: Compiler) {
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


	private tapOptimizeChunkAssets(compiler: Compiler, callback: (compilation: compilation.Compilation, chunks: Array<compilation.Chunk>) => void) {
		compiler.hooks.compilation.tap(TypescriptReflectionCollectorWebpackPlugin.REFLECTION_PLUGIN_NAME, compilation => {
			compilation.hooks.optimizeChunkAssets.tap(TypescriptReflectionCollectorWebpackPlugin.REFLECTION_PLUGIN_NAME, (chunks) => {
				callback(compilation, chunks);
			});
		});
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
		return new SourceFileEntryPoint(this.project, new UniqSimpleSchemaRepository());
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