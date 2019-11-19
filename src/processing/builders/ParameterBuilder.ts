import {ParameterDeclaration, TypeGuards} from "ts-morph";
import {ParameterSchema} from "../../schema/declarations/ParameterSchema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {BuildManager} from "../BuildManager";
import {Class} from "../../common/utils/Class";
import {Builder} from "../../common/utils/Builder";
import { Node } from "ts-morph";
import {TypeSchema} from "../../schema/type/TypeSchema";
import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class ParameterBuilder extends GenericNodeBuilder<ParameterDeclaration, ParameterSchema> {
	public build(q: Qualifier, n: ParameterDeclaration, manager: BuildManager): ParameterSchema {
		return Builder.of(ParameterSchema).setAndBuild({
			qualifier: q,
			name: n.getName(),
			isSpread: !!n.getDotDotDotToken(),
			type: manager.process().as(TypeSchema).value(n.getType())
		});
	}

	public match(n: unknown, manager: BuildManager): n is ParameterDeclaration {
		return n instanceof Node && TypeGuards.isParameterDeclaration(n);
	}

	public schema(): Class<ParameterSchema> {
		return ParameterSchema;
	}

}