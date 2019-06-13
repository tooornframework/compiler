import {BaseTypeScheme} from "./BaseTypeScheme";
import {Type} from "ts-morph";
import {BitMaskFactory} from "../../common/bits/BitMaskFactory";
import {BitMask} from "../../common/bits/BitMask";
import {CompilerContext} from "../../context/CompilerContext";

export class PlainTypeScheme extends BaseTypeScheme {

	public static FLAGS = BitMaskFactory.create(factory => ({
		STRING: factory.next(),
		STRING_LITERAL: factory.next(),
		NUMBER: factory.next(),
		NUMBER_LITERAL: factory.next(),
		UNDEFINED: factory.next(),
		NULL: factory.next(),
		UNKNOWN: factory.next(),
		NEVER: factory.next(),
		ANY: factory.next(),
		BOOLEAN: factory.next(),
		BOOLEAN_LITERAL: factory.next(),
		VOID: factory.next(),
		SYMBOL: factory.next(),
		EMPTY_OBJECT: factory.next(),
		OBJECT: factory.next(),
	}));

	public readonly flags: BitMask = BitMask.empty();

	public constructor(type: Type, context: CompilerContext) {
		super();

		this.flags.addIf(type.isString(), PlainTypeScheme.FLAGS.STRING);
		this.flags.addIf(type.isStringLiteral(), PlainTypeScheme.FLAGS.STRING_LITERAL);
		this.flags.addIf(type.isNumber(), PlainTypeScheme.FLAGS.NUMBER);
		this.flags.addIf(type.isNumberLiteral(), PlainTypeScheme.FLAGS.NUMBER_LITERAL);
		this.flags.addIf(type.isBoolean(), PlainTypeScheme.FLAGS.BOOLEAN);
		this.flags.addIf(type.isBooleanLiteral(), PlainTypeScheme.FLAGS.BOOLEAN_LITERAL);
		this.flags.addIf(type.isUnknown(), PlainTypeScheme.FLAGS.UNKNOWN);
		this.flags.addIf(type.isAny(), PlainTypeScheme.FLAGS.ANY);
		this.flags.addIf(type.isNull(), PlainTypeScheme.FLAGS.NULL);
		this.flags.addIf(type.isUndefined(), PlainTypeScheme.FLAGS.UNDEFINED);
		this.flags.addIf(type.getText() === "void", PlainTypeScheme.FLAGS.VOID);
		this.flags.addIf(type.getText() === "symbol", PlainTypeScheme.FLAGS.SYMBOL);
		this.flags.addIf(type.getText() === "{}", PlainTypeScheme.FLAGS.EMPTY_OBJECT);
		this.flags.addIf(type.getText() === "object", PlainTypeScheme.FLAGS.OBJECT);



		this.flags.freeze();

		if (this.flags.isEmpty()) {
			throw new Error("Unknown type")
		}
	}
}