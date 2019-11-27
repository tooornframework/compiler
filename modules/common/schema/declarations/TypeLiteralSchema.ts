import {Schema} from "../Schema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {MethodSchema} from "./MethodSchema";
import {PropertySchema} from "./PropertySchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class TypeLiteralSchema extends Schema {
	readonly properties: ReadonlyArray<AbstractReference<PropertySchema>>;
	readonly methods: ReadonlyArray<AbstractReference<MethodSchema>>;
}