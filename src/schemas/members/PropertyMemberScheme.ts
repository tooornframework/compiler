import {PropertyDeclaration, PropertySignature, TypeGuards} from "ts-morph";
import {BaseDeclarationScheme} from "../declaration/BaseDeclarationScheme";
import {BitMaskFactory} from "../../common/bits/BitMaskFactory";
import {BaseTypeScheme} from "../type/BaseTypeScheme";
import {DeclaredTypeScheme} from "../type/DeclaredTypeScheme";
import {CompilerContext} from "../../context/CompilerContext";
import {hasTextInOneOf} from "../../common/utils/NodeUtils";
import {BaseMemberScheme} from "./BaseMemberScheme";

export class PropertyMemberScheme extends BaseMemberScheme {
	public static readonly FLAGS = BitMaskFactory.create(factory => ({
		IS_STATIC: factory.next(),
		IS_ABSTRACT: factory.next(),
		IS_PRIVATE: factory.next(),
		IS_PUBLIC: factory.next(),
		IS_PROTECTED: factory.next(),
		IS_READONLY: factory.next(),
		IS_NULLABLE: factory.next(),
	}));

	public readonly decorators: ReadonlyArray<BaseTypeScheme>;

	public readonly type: BaseTypeScheme;

	constructor(declaration: PropertyDeclaration | PropertySignature, context: CompilerContext) {
		super(declaration, context);

		if (TypeGuards.isPropertyDeclaration(declaration)) {
			this.decorators = declaration.getDecorators()
				.map(it => context.getTypeManager().getScheme(it.getType()));

			this.flags.addIf(declaration.isAbstract(), PropertyMemberScheme.FLAGS.IS_ABSTRACT);
			this.flags.addIf(declaration.isStatic(), PropertyMemberScheme.FLAGS.IS_STATIC);
		}


		this.type = context.getTypeManager().getScheme(declaration.getType());

		this.flags.addIf(declaration.isReadonly(), PropertyMemberScheme.FLAGS.IS_READONLY);
		this.flags.addIf(declaration.hasQuestionToken(), PropertyMemberScheme.FLAGS.IS_NULLABLE);

		this.flags.addIf(hasTextInOneOf(declaration.getModifiers(), "public"), PropertyMemberScheme.FLAGS.IS_PUBLIC);
		this.flags.addIf(hasTextInOneOf(declaration.getModifiers(), "private"), PropertyMemberScheme.FLAGS.IS_PRIVATE);
		this.flags.addIf(hasTextInOneOf(declaration.getModifiers(), "protected"), PropertyMemberScheme.FLAGS.IS_PROTECTED);
		this.flags.freeze();
	}

}