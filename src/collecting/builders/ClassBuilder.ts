
import {ClassDeclaration, Node, TypeGuards} from "ts-morph";

import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {ClassSchema} from "../../schema/declarations/ClassSchema";
import {BuildManager} from "../BuildManager";
import {Builder} from "../../common/utils/Builder";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {DeclaredTypeSchema} from "../../schema/type/DeclaredTypeSchema";
import {MethodSchema} from "../../schema/declarations/MethodSchema";
import {PropertySchema} from "../../schema/declarations/PropertySchema";
import {TypeParameterSchema} from "../../schema/declarations/TypeParameterSchema";
import {Class} from "../../common/utils/Class";
import {InterfacesSetSchema} from "../../schema/declarations/InterfacesSetSchema";

export class ClassBuilder extends GenericNodeBuilder<ClassDeclaration, ClassSchema> {

	public match(x: unknown): x is ClassDeclaration {
		return x instanceof Node && TypeGuards.isClassDeclaration(x);
	}

	public build(qualifier: Qualifier, n: ClassDeclaration, manager: BuildManager): ClassSchema {
		return Builder.of(ClassSchema).setAndBuild({
			qualifier: qualifier,
			name: n.getName(),
			isAbstract: n.isAbstract(),
			isDefaultExport: n.isDefaultExport(),
			isNamedExport: n.isNamedExport(),
			isAmbient: n.isAmbient(),
			extends: manager.process().as(DeclaredTypeSchema).ifPresent(n.getExtends()),
			properties: manager.process().as(PropertySchema).all(n.getProperties()),
			typeArguments: manager.process().as(TypeParameterSchema).all(n.getTypeParameters()),
			methods: manager.process().as(MethodSchema).all(n.getMethods()),
			implements: manager.process().as(InterfacesSetSchema).as(ClassSchema).all(n.getImplements()),
		})
	}

	public schema(): Class<ClassSchema> {
		return ClassSchema;
	}


}

