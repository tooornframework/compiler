import {SchemeReducer} from "../SchemeReducer";
import {InterfaceSchema} from "../../schema/declarations/InterfaceSchema";
import {Builder} from "../../common/utils/Builder";
import {ListQualifier} from "../../common/qualifier/ListQualifier";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {InterfacesSetSchema} from "../../schema/declarations/InterfacesSetSchema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {Class} from "../../common/utils/Class";
import {ClassSchema} from "../../schema/declarations/ClassSchema";

export class ManyWithIterfacesToSetReducer extends SchemeReducer<InterfaceSchema, InterfacesSetSchema> {
	public match(values: Array<QualifiedReference<InterfaceSchema>>): values is Array<QualifiedReference<InterfaceSchema>> {
		const isAnyInterface =  values.some(it => it.isClassAllowed(InterfaceSchema));

		if (!isAnyInterface) {
			return false;
		}

		return values.length > 1;
	}

	public reduce(q: Qualifier, values: Array<QualifiedReference<InterfaceSchema>>): InterfacesSetSchema {
		return Builder.of(InterfacesSetSchema).setAndBuild({
			qualifier: q,
			interfaces: values,
		})
	}

	public qualifier(values: Array<QualifiedReference<InterfaceSchema>>): Qualifier {
		return new ListQualifier(values.filter(it => !it.isEmpty()).map(it => it.getQualifier()));
	}

	public schema(): Class<InterfacesSetSchema> {
		return InterfacesSetSchema;
	}

}