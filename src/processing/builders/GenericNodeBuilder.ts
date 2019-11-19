import {SchemaBuilder} from "../SchemaBuilder";
import {Node} from "ts-morph";
import {Schema} from "../../schema/Schema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {LongNodeQualifier} from "../../common/qualifier/LongNodeQualifier";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";
export abstract class GenericNodeBuilder<N extends Node, S extends Schema > extends SchemaBuilder<N, S> {

	protected augmentations(node: Node): Array<Node> {
		if (!node.getSymbol()) {
			return Array.of(node);
		}

		return node.getSymbol().getDeclarations();
	}


	public qualifier(n: Node): Qualifier {
		return new LongNodeQualifier(n);
	}
}