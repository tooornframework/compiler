import {BaseDeclarationScheme} from "./BaseDeclarationScheme";
import {EnumDeclaration} from "ts-morph";
import {EnumMemberScheme} from "../members/EnumMemberScheme";
import {CompilerContext} from "../../context/CompilerContext";

export class EnumScheme extends BaseDeclarationScheme {

	public readonly members: ReadonlyArray<EnumMemberScheme>

	public constructor(node: EnumDeclaration, context: CompilerContext) {
		super(node, context);
	}
}