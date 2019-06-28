import {Schema} from "../Schema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {ParameterSchema} from "./ParameterSchema";
import {TypeSchema} from "../type/TypeSchema";

export class FunctionSchema extends Schema {
	readonly isAbstract: boolean;
	readonly isAsync: boolean;
	readonly isPrivate: boolean;
	readonly isProtected: boolean;
	readonly isPublic: boolean;
	readonly isStatic: boolean;
	readonly name: string;
	readonly parameters: Array<QualifiedReference<ParameterSchema>>;
	readonly returns: QualifiedReference<TypeSchema>;
	readonly typeParameters: Array<QualifiedReference<TypeSchema>>;
}