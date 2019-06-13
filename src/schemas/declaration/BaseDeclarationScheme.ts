import { Node } from "ts-morph";
import {BitMask} from "../../common/bits/BitMask";
import {NodeQualifier} from "../../common/qualifier/NodeQualifier";
import {CompilerContext} from "../../context/CompilerContext";

export abstract class BaseDeclarationScheme {
	public readonly flags: BitMask = BitMask.empty();

	public readonly qualifier: NodeQualifier;

	public constructor(node: Node, context: CompilerContext) {
		this.qualifier = new NodeQualifier(node);
	}
}