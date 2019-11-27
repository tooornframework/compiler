import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {TypeAliasDeclaration, TypeGuards} from "ts-morph";
import {ProcessingManager} from "../ProcessingManager";
import {Qualifier} from "common/qualifier/Qualifier";
import {Class} from "common/misc/utils/Class";
import {Node} from "ts-morph";
import {Builder} from "common/misc/utils/Builder";
import {TypeAliasSchema} from "common/schema/declarations/TypeAliasSchema";
import {TypeSchema} from "common/schema/type/TypeSchema";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class TypeAliasBuilder extends GenericNodeBuilder<TypeAliasDeclaration, TypeAliasSchema> {
	public build(q: Qualifier, n: TypeAliasDeclaration, manager: ProcessingManager): TypeAliasSchema {
		return Builder.of(TypeAliasSchema).setAndBuild({
			name: n.getName(),
			qualifier: q,
			type: manager.process().as(TypeSchema).value(n.getType())
		});
	}

	public match(n: unknown, manager: ProcessingManager): n is TypeAliasDeclaration {
		return n instanceof Node && TypeGuards.isTypeAliasDeclaration(n);
	}

	public schema(): Class<TypeAliasSchema> {
		return TypeAliasSchema;
	}

}