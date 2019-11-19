import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {TypeSchema} from "../type/TypeSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class PropertySchema extends Schema {
	readonly isReadonly: boolean;
	readonly isNullable: boolean;
	readonly isAbstract: boolean;
	readonly isPrivate: boolean;
	readonly isProtected: boolean;
	readonly isPublic: boolean;
	readonly isStatic: boolean;
	readonly type: QualifiedReference<TypeSchema>;
	readonly name: string;
}