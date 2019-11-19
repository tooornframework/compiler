import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {TypeGuards, TypeLiteralNode} from "ts-morph";
import {TypeLiteralSchema} from "../../schema/declarations/TypeLiteralSchema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {BuildManager} from "../BuildManager";
import {Node} from "ts-morph";
import {Class} from "../../common/utils/Class";
import {Builder} from "../../common/utils/Builder";
import {MethodSchema} from "../../schema/declarations/MethodSchema";
import {PropertySchema} from "../../schema/declarations/PropertySchema";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class TypeLiteralBuilder extends GenericNodeBuilder<TypeLiteralNode, TypeLiteralSchema> {
	public build(q: Qualifier, n: TypeLiteralNode, manager: BuildManager): TypeLiteralSchema {
		return Builder.of(TypeLiteralSchema).setAndBuild({
			qualifier: q,
			methods: manager.process().as(MethodSchema).all(n.getMethods()),
			properties: manager.process().as(PropertySchema).all(n.getProperties())
		})
	}

	public match(n: unknown, manager: BuildManager): n is TypeLiteralNode {
		return n instanceof Node && TypeGuards.isTypeLiteralNode(n);
	}

	public schema(): Class<TypeLiteralSchema> {
		return TypeLiteralSchema;
	}

}