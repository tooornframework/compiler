import {Node} from "ts-morph";
import {BaseDeclarationScheme} from "./BaseDeclarationScheme";
import {CompilerContext} from "../../context/CompilerContext";

export class TypeParameterScheme extends BaseDeclarationScheme {
	public constructor(node: Node,  context: CompilerContext) {
		super(node, context);
	}
}