import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {ParameterSchema} from "./ParameterSchema";
import {TypeSchema} from "../type/TypeSchema";
import {TypeParameterSchema} from "./TypeParameterSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class FunctionSchema extends Schema {
	readonly isAbstract: boolean;
	readonly isAsync: boolean;
	readonly isStatic: boolean;
	readonly name: string;
	readonly parameters: Array<QualifiedReference<ParameterSchema>>;
	readonly returns: QualifiedReference<TypeSchema>;
	readonly typeParameters: Array<QualifiedReference<TypeParameterSchema>>;
}