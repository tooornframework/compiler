import {Schema} from "../Schema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {EnumMemberSchema} from "./EnumMemberSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class EnumSchema extends Schema {
	readonly members: ReadonlyArray<AbstractReference<EnumMemberSchema>>;
	readonly isAbstract: boolean;
	readonly isAmbient: boolean;
	readonly isDefaultExport: boolean;
	readonly isNamedExport: boolean;
	readonly name: string;
}