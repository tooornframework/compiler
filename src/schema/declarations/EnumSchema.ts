import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {EnumMemberSchema} from "./EnumMemberSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class EnumSchema extends Schema {
	readonly members: ReadonlyArray<QualifiedReference<EnumMemberSchema>>;
	readonly isAbstract: boolean;
	readonly isAmbient: boolean;
	readonly isDefaultExport: boolean;
	readonly isNamedExport: boolean;
	readonly name: string;
}