import {SchemaBuilder} from "../SchemaBuilder";
import {DeclaredTypeSchema} from "../../schema/type/DeclaredTypeSchema";
import {Type} from "ts-morph";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {BuildManager} from "../BuildManager";
import {TypeQualifier} from "../../common/qualifier/TypeQualifier";
import {Class} from "../../common/utils/Class";
import {Builder} from "../../common/utils/Builder";
import {TypeSchema} from "../../schema/type/TypeSchema";
import {Schema} from "../../schema/Schema";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class DeclaredTypeBuilder extends SchemaBuilder<Type, DeclaredTypeSchema> {
	public build(q: Qualifier, n: Type, manager: BuildManager): DeclaredTypeSchema {
		return Builder.of(DeclaredTypeSchema).setAndBuild({
			qualifier: q,
			reference: manager.process().as(Schema).value(n.getSymbol().getDeclarations()),
			typeArguments: manager.process().as(TypeSchema).allFiltered(n.getTypeArguments(), it => it.getText() !== "this")
		});
	}

	// TODO fix it
	public match(n: unknown, manager: BuildManager): n is Type {
		return n instanceof Type && !!n.getSymbol() && !!n.getSymbol().getDeclarations().length && !(n.isTuple() || n.isUnionOrIntersection());
	}

	public qualifier(n: Type): Qualifier {
		return new TypeQualifier(n);
	}

	public schema(): Class<DeclaredTypeSchema> {
		return DeclaredTypeSchema;
	}

}
