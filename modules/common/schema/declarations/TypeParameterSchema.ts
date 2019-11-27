import {Schema} from "../Schema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class TypeParameterSchema extends Schema {
	readonly name: string;
}