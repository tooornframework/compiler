import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {TypeGuards, TypeParameterDeclaration} from "ts-morph";
import {TypeParameterSchema} from "common/schema/declarations/TypeParameterSchema";
import {Qualifier} from "common/qualifier/Qualifier";
import {ProcessingManager} from "../ProcessingManager";
import {Node} from "ts-morph";
import {Class} from "common/misc/utils/Class";
import {Builder} from "common/misc/utils/Builder";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class TypeParameterBuilder extends GenericNodeBuilder<TypeParameterDeclaration, TypeParameterSchema> {
	public build(q: Qualifier, n: TypeParameterDeclaration, manager: ProcessingManager): TypeParameterSchema {
		return Builder.of(TypeParameterSchema).setAndBuild({
			qualifier: q,
			name: n.getName()
		});
	}

	public match(n: unknown, manager: ProcessingManager): n is TypeParameterDeclaration {
		return n instanceof Node && TypeGuards.isTypeParameterDeclaration(n);
	}

	public schema(): Class<TypeParameterSchema> {
		return TypeParameterSchema;
	}

}