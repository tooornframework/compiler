import {TypeSchema} from "./TypeSchema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {Schema} from "../Schema";

enum KIND {
	UNION = "UNION",
	INTERSECTION ="INTERSECTION",
	TUPLE = "TUPLE"
}

export class SetScheme extends TypeSchema {
	public static readonly KIND = KIND;

	readonly members: Array<QualifiedReference<Schema>>;
	readonly kind: KIND;
}