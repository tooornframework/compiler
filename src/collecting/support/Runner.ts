import {Project, Node, SourceFile} from "ts-morph";
import {BuildManager} from "../BuildManager";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {Schema} from "../../schema/Schema";

export class Runner {

	constructor(private project: Project, private processor: BuildManager) {

	}

	public start(filePath: string): Array<QualifiedReference<Schema>> {
		const sf = this.project.getSourceFile(filePath)!;

		sf.refreshFromFileSystemSync();

		return this.getCandidates(sf)
			.map(it => this.processor.process().as(Schema).value(it));
	}
	public getCandidates(sf: SourceFile): Array<Node> {
		return [].concat(sf.getInterfaces())
			.concat(sf.getClasses())
			.concat(sf.getFunctions())
			.concat(sf.getEnums())
			.concat(sf.getTypeAliases())
	}
}