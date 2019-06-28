import {Project} from "ts-morph";
import {Writer} from "../writer/Writer";
import {BuildManager} from "../collecting/BuildManager";
import {Repository} from "../collecting/support/Repository";
import {ClassBuilder} from "../collecting/builders/ClassBuilder";
import {Runner} from "../collecting/support/Runner";
import {InterfaceBuilder} from "../collecting/builders/InterfaceBuilder";
import {PropertyBuilder} from "../collecting/builders/PropertyBuilder";
import {VariableToDeclarationsInterceptor} from "../collecting/interseptors/VariableToDeclarationsInterceptor";
import {InterfaceReducer} from "../collecting/reducers/InterfaceReducer";
import {PlainTypeBuilder} from "../collecting/builders/PlainTypeBuilder";
import {DeclaredTypeBuilder} from "../collecting/builders/DeclaredTypeBuilder";

export class Loader {

	public asFunction() {
		const project = new Project({
			tsConfigFilePath: "./tsconfig.json"
		});

		const repository = new Repository();

		const buildManager = BuildManager.configure(conf => conf
				.builder(new ClassBuilder())
				.builder(new InterfaceBuilder())
				.builder(new PropertyBuilder())
				.builder(new PlainTypeBuilder())
				.builder(new DeclaredTypeBuilder())
				.interceptor(new VariableToDeclarationsInterceptor())
				.interceptor(new VariableToDeclarationsInterceptor())
				.reducer(new InterfaceReducer())
				.repository(repository)
		);

		const runner = new Runner(project, buildManager);


		return function () {
				const inFileQualifiers = runner.start(this.resourcePath);

				const writer = new Writer(project);

				console.log(repository.keys());

				debugger;
				writer.writeMetaInFile(this.resourcePath, inFileQualifiers);
		}
	}
}