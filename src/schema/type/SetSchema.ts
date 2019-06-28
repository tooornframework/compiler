import {TypeSchema} from "./TypeSchema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {Schema} from "../Schema";

export enum SetSchemaKind {
	UNION = "UNION",
	INTERSECTION ="INTERSECTION",
	TUPLE = "TUPLE"
}

export class SetSchema extends TypeSchema {
	public static readonly KIND = SetSchemaKind;

	readonly members: Array<QualifiedReference<Schema>>;
	readonly kind: SetSchemaKind;
}