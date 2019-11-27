import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {PropertyDeclaration, SyntaxKind, TypeGuards} from "ts-morph";
import {PropertySchema} from "common/schema/declarations/PropertySchema";
import {ProcessingManager} from "../ProcessingManager";
import {Node, PropertySignature} from "ts-morph";
import {Qualifier} from "common/qualifier/Qualifier";
import {Builder} from "common/misc/utils/Builder";
import {TypeSchema} from "common/schema/type/TypeSchema";
import {Class} from "common/misc/utils/Class";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class PropertyBuilder extends GenericNodeBuilder<PropertyDeclaration | PropertySignature, PropertySchema> {
	public match(n: unknown, manager: ProcessingManager): n is PropertyDeclaration {
		return n instanceof Node && (TypeGuards.isPropertySignature(n) || TypeGuards.isPropertyDeclaration(n));
	}

	public build(q: Qualifier, n: PropertyDeclaration | PropertySignature, manager: ProcessingManager): PropertySchema {
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