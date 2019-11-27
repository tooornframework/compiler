import {SchemeReducer} from "../SchemeReducer";
import {InterfaceSchema} from "common/schema/declarations/InterfaceSchema";
import {Builder} from "common/misc/utils/Builder";
import {ListQualifier} from "common/qualifier/ListQualifier";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {InterfacesSetSchema} from "common/schema/declarations/InterfacesSetSchema";
import {Qualifier} from "common/qualifier/Qualifier";
import {Class} from "common/misc/utils/Class";
import {ClassSchema} from "common/schema/declarations/ClassSchema";
import {Reducer} from "../context/annotations/Reducer";


@Reducer
export class ManyWithIterfacesToSetReducer extends SchemeReducer<InterfaceSchema, InterfacesSetSchema> {
	public match(values: Array<AbstractReference<InterfaceSchema>>): values is Array<AbstractReference<InterfaceSchema>> {
		const isAnyInterface =  values.some(it => it.isClassAllowed(InterfaceSchema));

		if (!isAnyInterface) {
			return false;
		}

		return values.length > 1;
	}

	public reduce(q: Qualifier, values: Array<AbstractReference<InterfaceSchema>>): InterfacesSetSchema {
		return Builder.of(InterfacesSetSchema).setAndBuild({
			qualifier: q,
			interfaces: values,
		})
	}

	public qualifier(values: Array<AbstractReference<InterfaceSchema>>): Qualifier {
		return new ListQualifier(values.filter(it => !it.isEmpty()).map(it => it.getQualifier()));
	}

	public schema(): Class<InterfacesSetSchema> {
		return InterfacesSetSchema;
	}

}