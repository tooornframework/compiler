import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {TypeAliasDeclaration, TypeGuards} from "ts-morph";
import {BuildManager} from "../BuildManager";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {Class} from "../../common/utils/Class";
import {Node} from "ts-morph";
import {Builder} from "../../common/utils/Builder";
import {TypeAliasSchema} from "../../schema/declarations/TypeAliasSchema";
import {TypeSchema} from "../../schema/type/TypeSchema";

export class TypeAliasBuilder extends GenericNodeBuilder<TypeAliasDeclaration, TypeAliasSchema> {
	public build(q: Qualifier, n: TypeAliasDeclaration, manager: BuildManager): TypeAliasSchema {
		return Builder.of(TypeAliasSchema).setAndBuild({
			name: n.getName(),
			qualifier: q,
			type: manager.process().as(TypeSchema).value(n.getType())
		});
	}

	public match(n: unknown, manager: BuildManager): n is TypeAliasDeclaration {
		return n instanceof Node && TypeGuards.isTypeAliasDeclaration(n);
	}

	public schema(): Class<TypeAliasSchema> {
		return TypeAliasSchema;
	}

}