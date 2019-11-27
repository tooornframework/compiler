import {ParameterDeclaration, TypeGuards} from "ts-morph";
import {ParameterSchema} from "common/schema/declarations/ParameterSchema";
import {Qualifier} from "common/qualifier/Qualifier";
import {ProcessingManager} from "../ProcessingManager";
import {Class} from "common/misc/utils/Class";
import {Builder} from "common/misc/utils/Builder";
import { Node } from "ts-morph";
import {TypeSchema} from "common/schema/type/TypeSchema";
import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class ParameterBuilder extends GenericNodeBuilder<ParameterDeclaration, ParameterSchema> {
	public build(q: Qualifier, n: ParameterDeclaration, manager: ProcessingManager): ParameterSchema {
		return Builder.of(ParameterSchema).setAndBuild({
			qualifier: q,
			name: n.getName(),
			isSpread: !!n.getDotDotDotToken(),
			type: manager.process().as(TypeSchema).value(n.getType())
		});
	}

	public match(n: unknown, manager: ProcessingManager): n is ParameterDeclaration {
		return n instanceof Node && TypeGuards.isParameterDeclaration(n);
	}

	public schema(): Class<ParameterSchema> {
		return ParameterSchema;
	}

}