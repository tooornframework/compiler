import {Package} from "../packaging/Package";
import {SourceFile, Node, TypeGuards} from "ts-morph";
import {ReflectionBridge} from "./bridge/ReflectionBridge";
import {Qualifier} from "../common/qualifier/Qualifier";

export class WritingManager {

	constructor(private readonly sf: SourceFile, private readonly bridge: ReflectionBridge) {

	}

	public writeDefinition(packages: Array<Package<number, unknown>>) {
		const stringifierPackages = JSON.stringify(packages);

		const code = this.bridge.getReflectionDefinitionImportCode(stringifierPackages);
		const imports = this.sf.getImportStringLiterals();
		const lastImport = imports[imports.length - 1];

		this.sf.insertText(lastImport ? lastImport.getEnd() : this.sf.getStart(), code);

	}

	public writeReference(node: Node, qualifier: Qualifier) {
		if (!TypeGuards.isNamedNode(node)) {
			return;
		}

		const code = this.bridge.getReflectionReferenceImportCode(node.getName(), qualifier.sym());
		const imports = this.sf.getImportStringLiterals();
		const lastImport = imports[imports.length - 1];
		this.sf.insertText(lastImport ? lastImport.getEnd() : this.sf.getStart(), code);
	}
}