import {PropertyMemberScheme} from "../members/PropertyMemberScheme";
import {MethodMemberScheme} from "../members/MethodMemberScheme";
import {BaseDeclarationScheme} from "./BaseDeclarationScheme";
import {TypeLiteralNode} from "ts-morph";
import {BitMaskFactory} from "../../common/bits/BitMaskFactory";
import {TypeParameterScheme} from "./TypeParameterScheme";
import {CompilerContext} from "../../context/CompilerContext";


export class TypeLiteralScheme extends BaseDeclarationScheme {

	public static readonly FLAGS = BitMaskFactory.create(factory => ({
		IS_DEFAULT_EXPORT: factory.next(),
		IS_NAMED_EXPORT: factory.next(),
		IS_ABSTRACT: factory.next(),
		IS_AMBIENT: factory.next(),
	}));

	public readonly typeParameters: ReadonlyArray<TypeParameterScheme>;

	public readonly properties: ReadonlyArray<PropertyMemberScheme>;

	public readonly methods: ReadonlyArray<MethodMemberScheme>;


	public constructor(declaration: TypeLiteralNode, context: CompilerContext) {
		super(declaration, context);

		this.methods = declaration.getMethods()
			.map(it => context.getMemberManager()
				.getMemberScheme(it, MethodMemberScheme));

		this.properties = declaration.getProperties()
			.map(it => context.getMemberManager()
				.getMemberScheme(it, PropertyMemberScheme));

		this.flags.freeze();
	}
}