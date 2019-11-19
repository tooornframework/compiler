import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {TypeSchema} from "../type/TypeSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class TypeAliasSchema extends Schema {
	readonly type: QualifiedReference<TypeSchema>;
	readonly name: string;
}