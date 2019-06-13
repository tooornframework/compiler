import {BaseDeclarationScheme} from "../schemas/declaration/BaseDeclarationScheme";

export class CompilerRepository {
	private declarations = new Map<string, BaseDeclarationScheme>();
	private sorted = [];

	public add(scheme: BaseDeclarationScheme) {
		this.declarations.set(scheme.qualifier.hash(), scheme);
		this.sorted.push(scheme.qualifier.hash());
	}
}