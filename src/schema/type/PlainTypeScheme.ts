import {TypeSchema} from "./TypeSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

enum KIND {
	STRING = "STRING",
	STRING_LITERAL = "STRING_LITERAL",
	NUMBER = "NUMBER",
	NUMBER_LITERAL = "NUMBER_LITERAL",
	UNDEFINED = "UNDEFINED",
	NULL = "NULL",
	UNKNOWN = "UNKNOWN",
	NEVER = "NEVER",
	ANY = "ANY",
	BOOLEAN = "BOOLEAN",
	BOOLEAN_LITERAL = "BOOLEAN_LITERAL",
	VOID = "VOID",
	SYMBOL = "SYMBOL",
	EMPTY_OBJECT = "EMPTY_OBJECT",
	OBJECT = "OBJECT",
	REFERENCED = "REFERENCED"
}

@NamedSchema
export class PlainTypeScheme extends TypeSchema {
	static KIND = KIND;
	kind: KIND;
}