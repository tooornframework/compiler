import {BitMask} from "../../common/bits/BitMask";
import {Node} from "ts-morph";
import {CompilerContext} from "../../context/CompilerContext";

export class BaseMemberScheme {

	public readonly flags: BitMask = BitMask.empty();
	public readonly name: string;

	public constructor(node: Node, context: CompilerContext) {
		this.name = node.getSymbol().getName();
	}
}