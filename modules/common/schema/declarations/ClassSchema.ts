import {Schema} from "../Schema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {DeclaredTypeSchema} from "../type/DeclaredTypeSchema";
import {PropertySchema} from "./PropertySchema";
import {MethodSchema} from "./MethodSchema";
import {TypeParameterSchema} from "./TypeParameterSchema";
import {InterfacesSetSchema} from "./InterfacesSetSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class ClassSchema extends Schema {
	readonly extends: AbstractReference<DeclaredTypeSchema> | null;
	readonly implements: ReadonlyArray<AbstractReference<InterfacesSetSchema | ClassSchema>>;
	readonly properties: ReadonlyArray<AbstractReference<PropertySchema>>;
	readonly methods: ReadonlyArray<AbstractReference<MethodSchema>>;
	readonly isAbstract: boolean;
	readonly isAmbient: boolean;
	readonly isDefaultExport: boolean;
	readonly isNamedExport: boolean;
	readonly name: string;
	readonly typeParameters: Array<AbstractReference<TypeParameterSchema>>;
}