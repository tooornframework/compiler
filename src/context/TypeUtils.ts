import {Type} from "ts-morph";

export function isTypeDeclarable(type: Type) {
	const tt = type.getTargetType() ? type.getTargetType() : type;
	return !!tt.getSymbol() && !!tt.getSymbol().getDeclarations().length
}

export function isTypePlain(type: Type) {
	return type.isString()
		|| type.isNumber()
		|| type.isNumberLiteral()
		|| type.isBooleanLiteral()
		|| type.isBoolean()
		|| type.isStringLiteral()
		|| type.isEnumLiteral()
		|| type.isString()
		|| type.getText() === "symbol"
		|| type.isUnknown()
		|| type.isUndefined()
		|| type.isNull()
		|| type.getText() === "void"
		|| type.isAny()
		|| type.getText() === "{}"
		|| type.getText() === "object"

}