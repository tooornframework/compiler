import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {DeclaredTypeSchema} from "../type/DeclaredTypeSchema";
import {PropertySchema} from "./PropertySchema";
import {MethodSchema} from "./MethodSchema";
import {TypeParameterSchema} from "./TypeParameterSchema";
import {InterfacesSetSchema} from "./InterfacesSetSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class ClassSchema extends Schema {
	readonly extends: QualifiedReference<DeclaredTypeSchema> | null;
	readonly implements: ReadonlyArray<QualifiedReference<InterfacesSetSchema | ClassSchema>>;
	readonly properties: ReadonlyArray<QualifiedReference<PropertySchema>>;
	readonly methods: ReadonlyArray<QualifiedReference<MethodSchema>>;
	readonly isAbstract: boolean;
	readonly isAmbient: boolean;
	readonly isDefaultExport: boolean;
	readonly isNamedExport: boolean;
	readonly name: string;
	readonly typeParameters: Array<QualifiedReference<TypeParameterSchema>>;
}