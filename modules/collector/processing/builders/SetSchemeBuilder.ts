import {SchemaBuilder} from "../SchemaBuilder";
import {Type} from "ts-morph";
import {SetSchema, SetSchemaKind} from "common/schema/type/SetSchema";
import {Class} from "common/misc/utils/Class";
import {Qualifier} from "common/qualifier/Qualifier";
import {ProcessingManager} from "../ProcessingManager";
import {Builder} from "common/misc/utils/Builder";
import {TypeSchema} from "common/schema/type/TypeSchema";
import {TypeQualifier} from "collector/misc/qualifier/TypeQualifier";
import {SchemaBuilderComponent} from "../context/annotations/SchemaBuilderComponent";

@SchemaBuilderComponent
export class SetSchemeBuilder extends SchemaBuilder<Type, SetSchema> {
	public build(q: Qualifier, n: Type, manager: ProcessingManager): SetSchema {
		const kind = this.getKind(n);
		return Builder.of(SetSchema).setAndBuild({
			kind: kind,
			qualifier: q,
			members: manager.process().as(TypeSchema).all(this.getMembers(kind, n))
		});
	}

	public match(n: unknown, manager: ProcessingManager): n is Type {
		return n instanceof Type && (n.isTuple() || n.isUnionOrIntersection());
	}

	public qualifier(n: Type): Qualifier {
		return new TypeQualifier(n);
	}

	public schema(): Class<SetSchema> {
		return SetSchema;
	}

	private getKind(n: Type) {
		if (n.isIntersection()) {
			return SetSchema.KIND.INTERSECTION;
		}

		if (n.isUnion()) {
			return SetSchema.KIND.UNION;
		}

		if (n.isTuple()) {
			return SetSchema.KIND.TUPLE
		}

		throw new Error("Unknown kind");
	}

	private getMembers(k: SetSchemaKind, t: Type) {
		switch (k) {
			case SetSchemaKind.INTERSECTION:
				return t.getIntersectionTypes();
			case SetSchemaKind.TUPLE:
				return t.getTupleElements();
			case SetSchemaKind.UNION:
				return t.getUnionTypes();
		}

		throw new Error("Unknown");
	}
}