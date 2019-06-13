import {Node, Type} from "ts-morph";
import {BaseTypeScheme} from "./BaseTypeScheme";
import {CompilerContext} from "../../context/CompilerContext";

export class TurpleScheme extends BaseTypeScheme {

	public readonly members: Array<BaseTypeScheme>;

	public constructor(type: Type, context: CompilerContext) {
		super();
		this.members = type.getTupleElements()
			.map(it => context.getTypeManager().getScheme(it));
	}
}