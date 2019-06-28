import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {DeclaredTypeSchema} from "../type/DeclaredTypeSchema";
import {PropertySchema} from "./PropertySchema";
import {MethodSchema} from "./MethodSchema";
import {TypeParameterSchema} from "./TypeParameterSchema";

export class InterfaceSchema extends Schema {
	readonly typeArguments: ReadonlyArray<QualifiedReference<TypeParameterSchema>>
	readonly extends: ReadonlyArray<QualifiedReference<DeclaredTypeSchema>>;
	readonly properties: ReadonlyArray<QualifiedReference<PropertySchema>>;
	readonly methods: ReadonlyArray<QualifiedReference<MethodSchema>>;
	readonly isAmbient: boolean;
	readonly isDefaultExport: boolean;
	readonly isNamedExport: boolean;
	readonly name: string;
}