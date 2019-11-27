import {SchemaBuilder} from "collector/processing/SchemaBuilder";
import {DeclaredTypeSchema} from "common/schema/type/DeclaredTypeSchema";
import {Type} from "ts-morph";
import {Qualifier} from "common/qualifier/Qualifier";
import {ProcessingManager} from "collector/processing/ProcessingManager";
import {TypeQualifier} from "collector/misc/qualifier/TypeQualifier";
import {Class} from "common/misc/utils/Class";
import {Builder} from "common/misc/utils/Builder";
import {TypeSchema} from "common/schema/type/TypeSchema";
import {Schema} from "common/schema/Schema";
import {SchemaBuilderComponent} from "collector/processing/context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class DeclaredTypeBuilder extends SchemaBuilder<Type, DeclaredTypeSchema> {
	public build(q: Qualifier, n: Type, manager: ProcessingManager): DeclaredTypeSchema {
		return Builder.of(DeclaredTypeSchema).setAndBuild({
			qualifier: q,
			reference: manager.process().as(Schema).value(n.getSymbol().getDeclarations()),
			typeArguments: manager.process().as(TypeSchema).allFiltered(n.getTypeArguments(), it => it.getText() !== "this")
		});
	}

	// TODO fix it
	public match(n: unknown, manager: ProcessingManager): n is Type {
		return n instanceof Type && !!n.getSymbol() && !!n.getSymbol().getDeclarations().length && !(n.isTuple() || n.isUnionOrIntersection());
	}

	public qualifier(n: Type): Qualifier {
		return new TypeQualifier(n);
	}

	public schema(): Class<DeclaredTypeSchema> {
		return DeclaredTypeSchema;
	}

}
