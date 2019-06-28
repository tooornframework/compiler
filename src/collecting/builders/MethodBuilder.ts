import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {MethodDeclaration, MethodSignature, PropertyDeclaration, SyntaxKind, TypeGuards} from "ts-morph";
import {PropertySchema} from "../../schema/declarations/PropertySchema";
import {BuildManager} from "../BuildManager";
import {Node, PropertySignature} from "ts-morph";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {Builder} from "../../common/utils/Builder";
import {TypeSchema} from "../../schema/type/TypeSchema";
import {Class} from "../../common/utils/Class";
import {MethodSchema} from "../../schema/declarations/MethodSchema";
import {ParameterSchema} from "../../schema/declarations/ParameterSchema";
import {TypeParameterSchema} from "../../schema/declarations/TypeParameterSchema";

export class MethodBuilder extends GenericNodeBuilder<MethodDeclaration | MethodSignature, MethodSchema> {
	public match(n: unknown, manager: BuildManager): n is MethodDeclaration | MethodSignature {
		return n instanceof Node && (TypeGuards.isMethodSignature(n) || TypeGuards.isMethodDeclaration(n));
	}

	public build(q: Qualifier, n: MethodDeclaration | MethodSignature, manager: BuildManager): MethodSchema {
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