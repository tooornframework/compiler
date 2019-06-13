import {Collector} from "../collector/Collector";
import {Project} from "ts-morph";
import {CompilerContext} from "../context/CompilerContext";
import {CompilerRepository} from "../context/CompilerRepository";

export class Loader {
	public asFunciton() {
		return function () {
			const project = new Project({
				tsConfigFilePath: "./tsconfig.json"
			});

			const repository = new CompilerRepository();
			const context = new CompilerContext(repository);
			const collector = new Collector(project, context);
			collector.start(this.resourcePath);
		}
	}
}