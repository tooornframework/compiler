import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {TypeGuards, TypeParameterDeclaration} from "ts-morph";
import {TypeParameterSchema} from "../../schema/declarations/TypeParameterSchema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {BuildManager} from "../BuildManager";
import {Node} from "ts-morph";
import {Class} from "../../common/utils/Class";
import {Builder} from "../../common/utils/Builder";

export class TypeParameterBuilder extends GenericNodeBuilder<TypeParameterDeclaration, TypeParameterSchema> {
	public build(q: Qualifier, n: TypeParameterDeclaration, manager: BuildManager): TypeParameterSchema {
		return Builder.of(TypeParameterSchema).setAndBuild({
			qualifier: q,
			name: n.getName()
		});
	}

	public match(n: unknown, manager: BuildManager): n is TypeParameterDeclaration {
		return n instanceof Node && TypeGuards.isTypeParameterDeclaration(n);
	}

	public schema(): Class<TypeParameterSchema> {
		return TypeParameterSchema;
	}

}