import {Schema} from "../Schema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {TypeSchema} from "../type/TypeSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class TypeAliasSchema extends Schema {
	readonly type: AbstractReference<TypeSchema>;
	readonly name: string;
}