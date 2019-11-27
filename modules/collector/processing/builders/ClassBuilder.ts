
import {ClassDeclaration, Node, TypeGuards} from "ts-morph";

import {GenericNodeBuilder} from "collector/processing/builders/GenericNodeBuilder";
import {ClassSchema} from "common/schema/declarations/ClassSchema";
import {ProcessingManager} from "collector/processing/ProcessingManager";
import {Builder} from "common/misc/utils/Builder";
import {Qualifier} from "common/qualifier/Qualifier";
import {DeclaredTypeSchema} from "common/schema/type/DeclaredTypeSchema";
import {MethodSchema} from "common/schema/declarations/MethodSchema";
import {PropertySchema} from "common/schema/declarations/PropertySchema";
import {TypeParameterSchema} from "common/schema/declarations/TypeParameterSchema";
import {Class} from "common/misc/utils/Class";
import {InterfacesSetSchema} from "common/schema/declarations/InterfacesSetSchema";
import {SchemaBuilderComponent} from "collector/processing/context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class ClassBuilder extends GenericNodeBuilder<ClassDeclaration, ClassSchema> {

	public match(x: unknown): x is ClassDeclaration {
		return x instanceof Node && TypeGuards.isClassDeclaration(x);
	}

	public build(qualifier: Qualifier, n: ClassDeclaration, manager: ProcessingManager): ClassSchema {
		return Builder.of(ClassSchema).setAndBuild({
			qualifier: qualifier,
			name: n.getName(),
			isAbstract: n.isAbstract(),
			isDefaultExport: n.isDefaultExport(),
			isNamedExport: n.isNamedExport(),
			isAmbient: n.isAmbient(),
			extends: manager.process().as(DeclaredTypeSchema).ifPresent(n.getExtends()),
			properties: manager.process().as(PropertySchema).all(n.getProperties()),
			typeParameters: manager.process().as(TypeParameterSchema).all(n.getTypeParameters()),
			methods: manager.process().as(MethodSchema).all(n.getMethods()),
			implements: manager.process().as(InterfacesSetSchema).as(ClassSchema).all(n.getImplements()),
		})
	}

	public schema(): Class<ClassSchema> {
		return ClassSchema;
	}


}

