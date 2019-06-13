import {FunctionDeclaration, FunctionTypeNode, TypeGuards} from "ts-morph";
import {BaseDeclarationScheme} from "./BaseDeclarationScheme";
import {BitMaskFactory} from "../../common/bits/BitMaskFactory";
import {BaseTypeScheme} from "../type/BaseTypeScheme";
import {TypeParameterScheme} from "./TypeParameterScheme";
import {CompilerContext} from "../../context/CompilerContext";
import {Qualifier} from "../../common/qualifier/Qualifier";

export class FunctionScheme extends BaseDeclarationScheme {


	public static readonly FLAGS = BitMaskFactory.create(factory => ({
		IS_ASYNC: factory.next(),
		IS_OVERLOAD: factory.next(),
		IS_AMBIENT: factory.next(),
		IS_NAMED_EXPORT: factory.next(),
		IS_DEFAULT_EXPORT: factory.next(),
	}));

	public readonly parameters: ReadonlyArray<BaseTypeScheme>;

	public readonly typeParameters: ReadonlyArray<Qualifier>;

	public readonly overloads: ReadonlyArray<Qualifier>;

	public readonly returnType: BaseTypeScheme;

	constructor(declaration: FunctionTypeNode | FunctionDeclaration, context: CompilerContext) {
		super(declaration, context);

		if (TypeGuards.isFunctionLikeDeclaration(declaration)) {
			// this.overloads = declaration.getOverloads()
			// 	.map(it => context.getDeclarationManager().getQualifier(it));
		}

		this.typeParameters = declaration.getTypeParameters()
			.map(it => context.getDeclarationManager().getQualifier(it));

		this.parameters = declaration.getParameters()
			.map(it => context.getTypeManager().getScheme(it.getType()));

		this.returnType = context.getTypeManager().getScheme(declaration.getReturnType());


		if (TypeGuards.isFunctionLikeDeclaration(declaration)) {
			this.flags.addIf(declaration.isAmbient(), FunctionScheme.FLAGS.IS_AMBIENT)
				.addIf(declaration.isNamedExport(), FunctionScheme.FLAGS.IS_NAMED_EXPORT)
				.addIf(declaration.isDefaultExport(), FunctionScheme.FLAGS.IS_DEFAULT_EXPORT)
				.addIf(declaration.isAsync(), FunctionScheme.FLAGS.IS_ASYNC)
				.addIf(declaration.isOverload(), FunctionScheme.FLAGS.IS_OVERLOAD);
		}

		this.flags.freeze();
	}


}