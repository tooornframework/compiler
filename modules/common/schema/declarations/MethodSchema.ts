import {Schema} from "../Schema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {ParameterSchema} from "./ParameterSchema";
import {TypeSchema} from "../type/TypeSchema";
import {TypeParameterSchema} from "./TypeParameterSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class MethodSchema extends Schema {
	readonly isAbstract: boolean;
	readonly isAsync: boolean;
	readonly isPrivate: boolean;
	readonly isProtected: boolean;
	readonly isPublic: boolean;
	readonly isStatic: boolean;
	readonly name: string;
	readonly parameters: Array<AbstractReference<ParameterSchema>>;
	readonly returns: AbstractReference<TypeSchema>;
	readonly typeParameters: Array<AbstractReference<TypeParameterSchema>>;
}