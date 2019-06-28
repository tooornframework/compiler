import {SchemaBuilder} from "../SchemaBuilder";
import {ParameterDeclaration} from "ts-morph";
import {ParameterSchema} from "../../schema/declarations/ParameterSchema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {BuildManager} from "../BuildManager";
import {Class} from "../../common/utils/Class";
import {Builder} from "../../common/utils/Builder";
import {TypeSchema} from "../../schema/type/TypeSchema";

export class ParameterBuilder extends SchemaBuilder<ParameterDeclaration, ParameterSchema> {
	public build(q: Qualifier, n: ParameterDeclaration, manager: BuildManager): ParameterSchema {
		return Builder.of(ParameterSchema).setAndBuild({
			qualifier: q,
			name: n.getName(),
			isSpread: !!n.getDotDotDotToken(),
			type: manager.process().as(TypeSchema).value(n.getType())
		});
	}

	public match(n: unknown, manager: BuildManager): n is ParameterDeclaration {
		return undefined;
	}

	public qualifier(n: ParameterDeclaration): Qualifier {
		return undefined;
	}

	public schema(): Class<ParameterSchema> {
		return undefined;
	}

}