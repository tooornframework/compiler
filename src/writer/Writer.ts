import {Qualifier} from "../common/qualifier/Qualifier";
import {Project, SourceFile} from "ts-morph";
import {QualifiedReference} from "../common/reference/QualifiedReference";
import {Schema} from "../schema/Schema";

export class Writer {
	constructor(private readonly project: Project) {

	}

	public writeMetaInFile(sourceFilePath: string, qualifiers: Array<QualifiedReference<Schema>>): SourceFile {
		const sf = this.project.getSourceFile(sourceFilePath);

		qualifiers.forEach(it => {

		});

		return sf;
	}
}