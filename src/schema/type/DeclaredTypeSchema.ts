import {TypeSchema} from "./TypeSchema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {Schema} from "../Schema";

export class DeclaredTypeSchema extends TypeSchema {
	readonly reference: QualifiedReference<Schema>;
	readonly typeArguments: Array<QualifiedReference<TypeSchema>>
}