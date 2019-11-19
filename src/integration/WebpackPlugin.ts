import {Project} from "ts-morph";
import {SourceFileEntryPoint} from "../entrypoints/SourceFileEntryPoint";
import {PackagingManager} from "../packaging/PackagingManager";
import {CodeGenerator} from "../codgen/CodeGenerator";
import {Compiler} from "webpack";
import { ConcatSource } from "webpack-sources";
import {Inject} from "../dependencies/annotations/Inject";
import {SchemaRepository} from "../repository/SchemaRepository";
import {StringsRepository} from "../repository/StringsRepository";

export class WebpackPlugin {
	private static REFLECTION_PLUGIN_NAME = "REFLECTION_PLUGIN_NAME";

	@Inject
	private codgen: CodeGenerator;

	private project = new Project({
		tsConfigFilePath: "./tsconfig.json"
	});

	public apply(compiler: Compiler) {
		const entryPoint = this.getEntryPoint();
		const packagingManager = this.getPackagingManager();

		this.project.getSourceFiles().forEach((sf) => {
			entryPoint.start(sf);
		});

		const packages = entryPoint.getRepository().values()
			.map(it => packagingManager.pack(it));

		compiler.hooks.compilation.tap(WebpackPlugin.REFLECTION_PLUGIN_NAME, compilation => {
			compilation.hooks.optimizeChunkAssets.tap(WebpackPlugin.REFLECTION_PLUGIN_NAME, (chunks, ...rest) => {
				for (const chunk of chunks) {
					for (const filename of chunk.files) {
						if (filename.toString().endsWith(".js")) {
							const source = this.codgen.createPackagesDefinition(packages);
							const names = this.codgen.createStringsDefinition(packagingManager.getStringsRepository().toJson())
							compilation.assets[filename] = new ConcatSource(compilation.assets[filename], source + names);
							return;
						}
					}
				}
			});
		});
	}

	private getEntryPoint() {
		return new SourceFileEntryPoint(this.project, new SchemaRepository());
	}

	private getPackagingManager() {
		return new PackagingManager(StringsRepository.empty());
	}
}