import {TypeSchema} from "./TypeSchema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {Schema} from "../Schema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class DeclaredTypeSchema extends TypeSchema {
	readonly reference: AbstractReference<Schema>;
	readonly typeArguments: Array<AbstractReference<TypeSchema>>
}