import {TypeSchema} from "./TypeSchema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {Schema} from "../Schema";
import {NamedSchema} from "../context/annotations/NamedSchema";

export enum SetSchemaKind {
	UNION = "UNION",
	INTERSECTION ="INTERSECTION",
	TUPLE = "TUPLE"
}

@NamedSchema
export class SetSchema extends TypeSchema {
	public static readonly KIND = SetSchemaKind;

	readonly members: Array<AbstractReference<Schema>>;
	readonly kind: SetSchemaKind;
}