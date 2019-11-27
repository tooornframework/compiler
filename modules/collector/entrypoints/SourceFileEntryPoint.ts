import {Project, Node, SourceFile, TypeGuards} from "ts-morph";
import {ProcessingManager} from "collector/processing/ProcessingManager";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {Schema} from "common/schema/Schema";
import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import {AbstractEntryPoint} from "collector/entrypoints/AbstractEntryPoint";

export class SourceFileEntryPoint extends AbstractEntryPoint {




	public start(sf: SourceFile, onAdd?: (schema: Schema, node: Node) => void): Array<AbstractReference<Schema>> {
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

	run() {
	}

	protected entryNodes(): Array<Node> {
		return undefined;
	}
}