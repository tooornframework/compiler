import {Package} from "../packaging/Package";
import {SourceFile, Node, TypeGuards} from "ts-morph";
import {ReflectionBridge} from "./bridge/ReflectionBridge";
import {Qualifier} from "../common/qualifier/Qualifier";
import {Inject} from "../dependencies/annotations/Inject";
import {Service} from "../dependencies/annotations/Service";
import {Json} from "../common/utils/Json";

@Service
export class CodeGenerator {

	@Inject
	private readonly bridge: ReflectionBridge;

	public createPackagesDefinition(packages: Array<object>) {
		const stringifierPackages = JSON.stringify(packages);
		return this.bridge.getReflectionDefinitionImportCode(stringifierPackages);

	}

	public createStringsDefinition(stringsRepository: Json) {
		const stringifierPackages = JSON.stringify(stringsRepository);
		return this.bridge.getReflectionStringsRepositoryDefinitionImportCode(stringifierPackages);

	}
	public writeReference(node: Node, qualifier: Qualifier) {
		throw new Error("Unimpl");
	}
}