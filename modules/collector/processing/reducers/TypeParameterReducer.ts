import {SchemeReducer} from "../SchemeReducer";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {Qualifier} from "common/qualifier/Qualifier";
import {Class} from "common/misc/utils/Class";
import {TypeParameterSchema} from "common/schema/declarations/TypeParameterSchema";
import {Reducer} from "../context/annotations/Reducer";

@Reducer
export class TypeParameterReducer extends SchemeReducer<TypeParameterSchema, TypeParameterSchema> {
	public match(values: Array<AbstractReference<TypeParameterSchema>>): values is Array<AbstractReference<TypeParameterSchema>> {
		return values.every(it => it.isClassAllowed(TypeParameterSchema));
	}

	public reduce(q: Qualifier, values: Array<AbstractReference<TypeParameterSchema>>): TypeParameterSchema {
		return values[0].getValue();
	}

	public qualifier(values: Array<AbstractReference<TypeParameterSchema>>): Qualifier {
		return values[0].getQualifier();
	}

	public schema(): Class<TypeParameterSchema> {
		return TypeParameterSchema;
	}

}