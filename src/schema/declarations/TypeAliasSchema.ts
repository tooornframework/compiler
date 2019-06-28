import {Schema} from "../Schema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {TypeSchema} from "../type/TypeSchema";

export class TypeAliasSchema extends Schema {
	readonly type: QualifiedReference<TypeSchema>;
	readonly name: string;
}