import {Project, Node, SourceFile, TypeGuards} from "ts-morph";
import {BuildManager} from "../processing/BuildManager";
import {QualifiedReference} from "../common/reference/QualifiedReference";
import {Schema} from "../schema/Schema";
import {Inject} from "../dependencies/annotations/Inject";
import {SchemaRepository} from "../repository/SchemaRepository";

export class SourceFileEntryPoint {

    private buildManager = new BuildManager();

	constructor(private project: Project, private repository: SchemaRepository) {
		this.buildManager.useRepository(repository);
	}

	public getRepository() {
		return this.repository;
	}

	public start(sf: SourceFile, onAdd?: (schema: Schema, node: Node) => void): Array<QualifiedReference<Schema>> {
		sf.refreshFromFileSystemSync();

		return this.getCandidates(sf).map(it => {
			const ref = this.buildManager.process().as(Schema).value(it);

			if (TypeGuards.isClassDeclaration(it) || TypeGuards.isEnumDeclaration(it)) {
				if (!ref.isEmpty() && onAdd) {
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