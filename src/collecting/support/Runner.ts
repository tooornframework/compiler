import {Project, Node, SourceFile, TypeGuards} from "ts-morph";
import {BuildManager} from "../BuildManager";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {Schema} from "../../schema/Schema";

export class Runner {

	constructor(private project: Project, private processor: BuildManager) {

	}

	public start(filePath: string, onAdd: (schema: Schema, node: Node) => void): Array<QualifiedReference<Schema>> {
		const sf = this.project.getSourceFile(filePath)!;

		sf.refreshFromFileSystemSync();

		return this.getCandidates(sf).map(it => {
			const ref = this.processor.process().as(Schema).value(it);

			if (TypeGuards.isClassDeclaration(it) || TypeGuards.isEnumDeclaration(it)) {
				if (!ref.isEmpty()) {
					onAdd(ref.getValue(), it);
				}
			}
			return ref;
		});
	}
	public getCandidates(sf: SourceFile): Array<Node> {
		return [].concat(sf.getInterfaces())
			.concat(sf.getClasses())
			.concat(sf.getFunctions())
			.concat(sf.getEnums())
			.concat(sf.getTypeAliases())
	}
}