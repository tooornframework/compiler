import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {MethodSchema} from "./MethodSchema";
import {PropertySchema} from "./PropertySchema";


export class TypeLiteralSchema extends Schema {
	readonly properties: ReadonlyArray<QualifiedReference<PropertySchema>>;
	readonly methods: ReadonlyArray<QualifiedReference<MethodSchema>>;
}