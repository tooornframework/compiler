import {BaseDeclarationScheme} from "../declaration/BaseDeclarationScheme";
import {MethodDeclaration, MethodSignature, TypeGuards} from "ts-morph";
import {BitMaskFactory} from "../../common/bits/BitMaskFactory";
import {hasTextInOneOf} from "../../common/utils/NodeUtils";
import {DeclaredTypeScheme} from "../type/DeclaredTypeScheme";
import {CompilerContext} from "../../context/CompilerContext";
import {BaseTypeScheme} from "../type/BaseTypeScheme";
import {TypeParameterScheme} from "../declaration/TypeParameterScheme";
import {BaseMemberScheme} from "./BaseMemberScheme";
import {Qualifier} from "../../common/qualifier/Qualifier";

export class MethodMemberScheme extends BaseMemberScheme {

	public static readonly FLAGS = BitMaskFactory.create(factory => ({
		IS_STATIC: factory.next(),
		IS_ASYNC: factory.next(),
		IS_ABSTRACT: factory.next(),
		IS_OVERLOAD: factory.next(),
		IS_PRIVATE: factory.next(),
		IS_PUBLIC: factory.next(),
		IS_PROTECTED: factory.next(),
	}));

	public readonly parameters: ReadonlyArray<BaseTypeScheme>;

	public readonly typeParameters: ReadonlyArray<Qualifier> = [];

	public readonly decorators: ReadonlyArray<BaseTypeScheme>;

	public readonly overloads: ReadonlyArray<MethodMemberScheme>;

	public readonly returnType: BaseTypeScheme;

	constructor(declaration: MethodDeclaration | MethodSignature, context: CompilerContext) {
		super(declaration, context);

		this.typeParameters = declaration.getTypeParameters()
			.map(it => context.getDeclarationManager().getQualifier(it));
		this.parameters = declaration.getParameters()
			.map(it => context.getTypeManager().getScheme(it.getType()));

		this.returnType = context.getTypeManager().getScheme(declaration.getReturnType());


		if (TypeGuards.isMethodDeclaration(declaration)) {
			// this.overloads = declaration.getOverloads()
			// 	.map(it => context.getMemberManager().getMemberScheme(it, MethodMemberScheme));

			this.decorators = declaration.getDecorators()
				.map(it => context.getTypeManager()
					.getScheme(it.getType()));

			this.flags.addIf(declaration.isAbstract(), MethodMemberScheme.FLAGS.IS_ABSTRACT);
			this.flags.addIf(declaration.isStatic(), MethodMemberScheme.FLAGS.IS_STATIC);
			this.flags.addIf(declaration.isAsync(), MethodMemberScheme.FLAGS.IS_ASYNC);
			this.flags.addIf(declaration.isOverload(), MethodMemberScheme.FLAGS.IS_OVERLOAD);
			this.flags.addIf(hasTextInOneOf(declaration.getModifiers(), "public"), MethodMemberScheme.FLAGS.IS_PUBLIC);
			this.flags.addIf(hasTextInOneOf(declaration.getModifiers(), "private"), MethodMemberScheme.FLAGS.IS_PRIVATE);
			this.flags.addIf(hasTextInOneOf(declaration.getModifiers(), "protected"), MethodMemberScheme.FLAGS.IS_PROTECTED);
		}

		this.flags.freeze();
	}
}