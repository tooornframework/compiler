import {Project, Node, SourceFile} from "ts-morph";
import {CompilerContext} from "../context/CompilerContext";

export class Collector {

	constructor(private project: Project, private context: CompilerContext) {

	}

	public start(filePath: string): void {
		const sf = this.project.getSourceFile(filePath)!;

		sf.refreshFromFileSystemSync();

		return this.getCandidates(sf)
			.forEach(it => this.context.process(it));
	}
	public getCandidates(sf: SourceFile): Array<Node> {
		return [].concat(sf.getInterfaces())
			.concat(sf.getClasses())
			.concat(sf.getFunctions())
			.concat(sf.getEnums())
			.concat(sf.getTypeAliases())
	}
}