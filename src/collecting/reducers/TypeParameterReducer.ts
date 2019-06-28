import {SchemeReducer} from "../SchemeReducer";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {Class} from "../../common/utils/Class";
import {TypeParameterSchema} from "../../schema/declarations/TypeParameterSchema";

export class TypeParameterReducer extends SchemeReducer<TypeParameterSchema, TypeParameterSchema> {
	public match(values: Array<QualifiedReference<TypeParameterSchema>>): values is Array<QualifiedReference<TypeParameterSchema>> {
		return values.every(it => it.isClassAllowed(TypeParameterSchema));
	}

	public reduce(q: Qualifier, values: Array<QualifiedReference<TypeParameterSchema>>): TypeParameterSchema {
		return values[0].getValue();
	}

	public qualifier(values: Array<QualifiedReference<TypeParameterSchema>>): Qualifier {
		return values[0].getQualifier();
	}

	public schema(): Class<TypeParameterSchema> {
		return TypeParameterSchema;
	}

}