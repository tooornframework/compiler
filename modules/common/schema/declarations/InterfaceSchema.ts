import {Schema} from "../Schema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {DeclaredTypeSchema} from "../type/DeclaredTypeSchema";
import {PropertySchema} from "./PropertySchema";
import {MethodSchema} from "./MethodSchema";
import {TypeParameterSchema} from "./TypeParameterSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class InterfaceSchema extends Schema {
	readonly typeParameters: ReadonlyArray<AbstractReference<TypeParameterSchema>>
	readonly extends: ReadonlyArray<AbstractReference<DeclaredTypeSchema>>;
	readonly properties: ReadonlyArray<AbstractReference<PropertySchema>>;
	readonly methods: ReadonlyArray<AbstractReference<MethodSchema>>;
	readonly isAmbient: boolean;
	readonly isDefaultExport: boolean;
	readonly isNamedExport: boolean;
	readonly name: string;
}