import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {PropertyDeclaration, SyntaxKind, TypeGuards} from "ts-morph";
import {PropertySchema} from "../../schema/declarations/PropertySchema";
import {BuildManager} from "../BuildManager";
import {Node, PropertySignature} from "ts-morph";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {Builder} from "../../common/utils/Builder";
import {TypeSchema} from "../../schema/type/TypeSchema";
import {Class} from "../../common/utils/Class";

export class PropertyBuilder extends GenericNodeBuilder<PropertyDeclaration | PropertySignature, PropertySchema> {
	public match(n: unknown, manager: BuildManager): n is PropertyDeclaration {
		return n instanceof Node && (TypeGuards.isPropertySignature(n) || TypeGuards.isPropertyDeclaration(n));
	}

	public build(q: Qualifier, n: PropertyDeclaration | PropertySignature, manager: BuildManager): PropertySchema {
		return Builder.of(PropertySchema).setAndBuild({
			qualifier: q,
			isAbstract: TypeGuards.isPropertySignature(n) ? true : n.isAbstract(),
			isNullable: n.hasQuestionToken() || n.hasInitializer() || n.getType().isNullable(),
			isPrivate: n.hasModifier(SyntaxKind.PrivateKeyword),
			isProtected: n.hasModifier(SyntaxKind.ProtectedKeyword),
			isPublic: n.hasModifier(SyntaxKind.PublicKeyword),
			isReadonly: n.isReadonly(),
			isStatic: TypeGuards.isPropertySignature(n) ? false : n.isStatic(),
			name: n.getName(),
			type: manager.process().as(TypeSchema).value(n.getType()),
		});
	}

	public schema(): Class<PropertySchema> {
		return PropertySchema;
	}


}