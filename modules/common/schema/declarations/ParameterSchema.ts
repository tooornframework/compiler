import {TypeSchema} from "../type/TypeSchema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class ParameterSchema extends TypeSchema {
	public readonly name: string;
	public readonly isSpread: boolean;
	public readonly type: AbstractReference<TypeSchema>
}