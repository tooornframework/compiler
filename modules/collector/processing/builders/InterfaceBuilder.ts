
import {InterfaceDeclaration, Node, TypeGuards} from "ts-morph";

import {GenericNodeBuilder} from "collector/processing/builders/GenericNodeBuilder";
import {ProcessingManager} from "collector/processing/ProcessingManager";
import {Builder} from "common/misc/utils/Builder";
import {Qualifier} from "common/qualifier/Qualifier";
import {DeclaredTypeSchema} from "common/schema/type/DeclaredTypeSchema";
import {InterfaceSchema} from "common/schema/declarations/InterfaceSchema";
import {MethodSchema} from "common/schema/declarations/MethodSchema";
import {PropertySchema} from "common/schema/declarations/PropertySchema";
import {TypeParameterSchema} from "common/schema/declarations/TypeParameterSchema";
import {Class} from "common/misc/utils/Class";
import {SchemaBuilderComponent} from "collector/processing/context/annotations/SchemaBuilderComponent";


@SchemaBuilderComponent
export class InterfaceBuilder extends GenericNodeBuilder<InterfaceDeclaration, InterfaceSchema> {

	public match(x: unknown): x is InterfaceDeclaration {
		return x instanceof Node && TypeGuards.isInterfaceDeclaration(x);
	}

	public build(qualifier: Qualifier, n: InterfaceDeclaration, manager: ProcessingManager): InterfaceSchema {
		return Builder.of(InterfaceSchema).setAndBuild({
			qualifier: qualifier,
			name: n.getName(),
			isDefaultExport: n.isDefaultExport(),
			isNamedExport: n.isNamedExport(),
			isAmbient: n.isAmbient(),
			extends: manager.process().as(DeclaredTypeSchema).all(n.getExtends()),
			properties: manager.process().as(PropertySchema).all(n.getProperties()),
			typeParameters: manager.process().as(TypeParameterSchema).all(n.getTypeParameters()),
			methods: manager.process().as(MethodSchema).all(n.getMethods())
		})
	}

	public schema(): Class<InterfaceSchema> {
		return InterfaceSchema;
	}
}

