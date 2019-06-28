import {SchemaBuilder} from "../SchemaBuilder";
import {Type} from "ts-morph";
import {PlainTypeScheme} from "../../schema/type/PlainTypeScheme";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {BuildManager} from "../BuildManager";
import {TypeQualifier} from "../../common/qualifier/TypeQualifier";
import {isTypePlain} from "../../common/utils/NodeUtils";
import {Builder} from "../../common/utils/Builder";
import {Class} from "../../common/utils/Class";

export class PlainTypeBuilder extends SchemaBuilder<Type, PlainTypeScheme>{
	public build(q: Qualifier, n: Type, manager: BuildManager): PlainTypeScheme {
		return Builder.of(PlainTypeScheme).setAndBuild({
			qualifier: q,
			kind: this.getKind(n)
		})
	}

	public match(n: unknown, manager: BuildManager): n is Type {
		return n instanceof Type && isTypePlain(n);
	}

	public qualifier(n: Type): Qualifier {
		return new TypeQualifier(n);
	}

	private getKind(type: Type) {
		if (type.isString()) {
			return PlainTypeScheme.KIND.STRING;
		}
		if (type.isStringLiteral()) {
			return PlainTypeScheme.KIND.STRING_LITERAL;
		}
		if (type.isNumber()) {
			return PlainTypeScheme.KIND.NUMBER;
		}
		if (type.isNumberLiteral()) {
			return PlainTypeScheme.KIND.NUMBER_LITERAL;
		}
		if (type.isBoolean()) {
			return PlainTypeScheme.KIND.BOOLEAN;
		}
		if (type.isBooleanLiteral()) {
			return PlainTypeScheme.KIND.BOOLEAN_LITERAL;
		}
		if (type.isUnknown()) {
			return PlainTypeScheme.KIND.UNKNOWN;
		}
		if (type.isAny()) {
			return PlainTypeScheme.KIND.ANY;
		}
		if (type.isNull()) {
			return PlainTypeScheme.KIND.NULL;
		}
		if (type.isUndefined()) {
			return PlainTypeScheme.KIND.UNDEFINED;
		}
		if (type.getText() === "void") {
			return PlainTypeScheme.KIND.VOID;
		}
		if (type.getText() === "symbol") {
			return PlainTypeScheme.KIND.SYMBOL;
		}
		if (type.getText() === "{}") {
			return PlainTypeScheme.KIND.EMPTY_OBJECT;
		}
		if (type.getText() === "object") {
			return PlainTypeScheme.KIND.OBJECT;
		}

		return PlainTypeScheme.KIND.UNKNOWN;
	}

	public schema(): Class<PlainTypeScheme> {
		return PlainTypeScheme;
	}

}