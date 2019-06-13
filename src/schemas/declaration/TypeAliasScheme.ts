import {Node} from "ts-morph";
import {BaseDeclarationScheme} from "./BaseDeclarationScheme";
import {BaseTypeScheme} from "../type/BaseTypeScheme";
import {CompilerContext} from "../../context/CompilerContext";

export class TypeAliasScheme extends BaseDeclarationScheme {
	public readonly type: BaseTypeScheme;

	constructor(node: Node, context: CompilerContext) {
		super(node, context);
		this.type = context.getTypeManager().getScheme(node.getType());
	}

}