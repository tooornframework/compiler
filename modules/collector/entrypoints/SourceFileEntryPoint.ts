import {Project, Node} from "ts-morph";
import {AbstractEntryPoint} from "collector/entrypoints/AbstractEntryPoint";

export class SourceFileEntryPoint extends AbstractEntryPoint {
	private static readonly project = new Project({
		skipFileDependencyResolution: true
	});


	constructor(private sourceFilePath: string) {
		super();
	}

	protected entryNodes(): Array<Node> {
		const sf = SourceFileEntryPoint.project.addExistingSourceFile(this.sourceFilePath);
		sf.refreshFromFileSystemSync();

		return [].concat(sf.getInterfaces())
			.concat(sf.getClasses())
			.concat(sf.getFunctions())
			.concat(sf.getEnums())
			.concat(sf.getTypeAliases());
	}
}