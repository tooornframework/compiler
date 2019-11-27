import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {MethodDeclaration, MethodSignature, PropertyDeclaration, SyntaxKind, TypeGuards} from "ts-morph";
import {PropertySchema} from "common/schema/declarations/PropertySchema";
import {ProcessingManager} from "../ProcessingManager";
import {Node, PropertySignature} from "ts-morph";
import {Qualifier} from "common/qualifier/Qualifier";
import {Builder} from "common/misc/utils/Builder";
import {TypeSchema} from "common/schema/type/TypeSchema";
import {Class} from "common/misc/utils/Class";
import {MethodSchema} from "common/schema/declarations/MethodSchema";
import {ParameterSchema} from "common/schema/declarations/ParameterSchema";
import {TypeParameterSchema} from "common/schema/declarations/TypeParameterSchema";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class MethodBuilder extends GenericNodeBuilder<MethodDeclaration | MethodSignature, MethodSchema> {
	public match(n: unknown, manager: ProcessingManager): n is MethodDeclaration | MethodSignature {
		return n instanceof Node && (TypeGuards.isMethodSignature(n) || TypeGuards.isMethodDeclaration(n));
	}

	public build(q: Qualifier, n: MethodDeclaration | MethodSignature, manager: ProcessingManager): MethodSchema {
		return Builder.of<MethodSchema>(MethodSchema).setAndBuild({
			qualifier: q,
			isAbstract: TypeGuards.isMethodSignature(n) ? true : n.isAbstract(),
			isAsync: TypeGuards.isMethodSignature(n) ? false : n.isAsync(),
			isStatic: TypeGuards.isMethodSignature(n) ? false : n.isStatic(),
			name: n.getName(),
			returns: manager.process().as(TypeSchema).value(n.getReturnType()),
			isPrivate: TypeGuards.isMethodSignature(n) ? false : n.hasModifier(SyntaxKind.PrivateKeyword),
			isProtected: TypeGuards.isMethodSignature(n) ? false : n.hasModifier(SyntaxKind.ProtectedKeyword),
			isPublic: TypeGuards.isMethodSignature(n) ? true : n.hasModifier(SyntaxKind.PublicKeyword),
			parameters: manager.process().as(ParameterSchema).all(n.getParameters()),
			typeParameters: manager.process().as(TypeParameterSchema).all(n.getTypeParameters())
		});
	}

	public schema(): Class<MethodSchema> {
		return MethodSchema;
	}


}