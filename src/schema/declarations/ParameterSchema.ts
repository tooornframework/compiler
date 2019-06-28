import {TypeSchema} from "../type/TypeSchema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";

export class ParameterSchema extends TypeSchema {
	public readonly name: string;
	public readonly isSpread: boolean;
	public readonly type: QualifiedReference<TypeSchema>
}