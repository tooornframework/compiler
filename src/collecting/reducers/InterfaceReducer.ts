import {SchemeReducer} from "../SchemeReducer";
import {InterfaceSchema} from "../../schema/declarations/InterfaceSchema";
import {Builder} from "../../common/utils/Builder";
import {SetQualifier} from "../../common/qualifier/SetQualifier";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {InterfacesSetSchema} from "../../schema/declarations/InterfacesSetSchema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {Class} from "../../common/utils/Class";

export class InterfaceReducer extends SchemeReducer<InterfaceSchema, InterfacesSetSchema> {
	public match(values: Array<QualifiedReference<InterfaceSchema>>): values is Array<QualifiedReference<InterfaceSchema>> {
		return values.every(it => it.isClassAllowed(InterfaceSchema));
	}

	public reduce(q: Qualifier, values: Array<QualifiedReference<InterfaceSchema>>): InterfacesSetSchema {
		return Builder.of(InterfacesSetSchema).setAndBuild({
			qualifier: q,
			interfaces: values,
		})
	}

	public qualifier(values: Array<QualifiedReference<InterfaceSchema>>): Qualifier {
		return new SetQualifier(values.map(it => it.getQualifier()));
	}

	public schema(): Class<InterfacesSetSchema> {
		return InterfacesSetSchema;
	}

}