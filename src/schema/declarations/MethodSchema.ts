import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {ParameterSchema} from "./ParameterSchema";
import {TypeSchema} from "../type/TypeSchema";

export class MethodSchema extends Schema {
	readonly isAbstract: boolean;
	readonly isAsync: boolean;
	readonly isPrivate: boolean;
	readonly isProtected: boolean;
	readonly isPublic: boolean;
	readonly isStatic: boolean;
	readonly name: string;
	readonly parameters: Array<QualifiedReference<ParameterSchema>>;
	readonly returns: QualifiedReference<TypeSchema>;
	readonly typeArguments: Array<QualifiedReference<TypeSchema>>;
}