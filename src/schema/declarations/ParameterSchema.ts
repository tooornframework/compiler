import {TypeSchema} from "../type/TypeSchema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class ParameterSchema extends TypeSchema {
	public readonly name: string;
	public readonly isSpread: boolean;
	public readonly type: QualifiedReference<TypeSchema>
}