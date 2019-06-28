
import {InterfaceDeclaration, Node, TypeGuards} from "ts-morph";

import {GenericNodeBuilder} from "./GenericNodeBuilder";
import {BuildManager} from "../BuildManager";
import {Builder} from "../../common/utils/Builder";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {DeclaredTypeSchema} from "../../schema/type/DeclaredTypeSchema";
import {InterfaceSchema} from "../../schema/declarations/InterfaceSchema";
import {MethodSchema} from "../../schema/declarations/MethodSchema";
import {PropertySchema} from "../../schema/declarations/PropertySchema";
import {TypeParameterSchema} from "../../schema/declarations/TypeParameterSchema";
import {Class} from "../../common/utils/Class";

export class InterfaceBuilder extends GenericNodeBuilder<InterfaceDeclaration, InterfaceSchema> {

	public match(x: unknown): x is InterfaceDeclaration {
		return x instanceof Node && TypeGuards.isInterfaceDeclaration(x);
	}

	public build(qualifier: Qualifier, n: InterfaceDeclaration, manager: BuildManager): InterfaceSchema {
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

