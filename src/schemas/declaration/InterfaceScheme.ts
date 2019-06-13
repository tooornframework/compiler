import {BaseDeclarationScheme} from "./BaseDeclarationScheme";
import {BitMaskFactory} from "../../common/bits/BitMaskFactory";
import {DeclaredTypeScheme} from "../type/DeclaredTypeScheme";
import {InterfaceDeclaration} from "ts-morph";
import {CompilerContext} from "../../context/CompilerContext";
import {PropertyMemberScheme} from "../members/PropertyMemberScheme";
import {MethodMemberScheme} from "../members/MethodMemberScheme";
import {TypeParameterScheme} from "./TypeParameterScheme";
import {Qualifier} from "../../common/qualifier/Qualifier";

export class InterfaceScheme extends BaseDeclarationScheme {

	public static readonly FLAGS = BitMaskFactory.create(factory => ({
		IS_DEFAULT_EXPORT: factory.next(),
		IS_NAMED_EXPORT: factory.next(),
		IS_AMBIENT: factory.next(),
	}));

	public readonly typeParameters: ReadonlyArray<Qualifier> = [];

	public readonly extends: Array<DeclaredTypeScheme>;

	public readonly properties: ReadonlyArray<PropertyMemberScheme>;

	public readonly methods: ReadonlyArray<MethodMemberScheme>;

	public constructor(declaration: InterfaceDeclaration, context: CompilerContext) {
		super(declaration, context);

		this.methods = declaration.getMethods()
			.map(it => context.getMemberManager()
				.getMemberScheme(it, MethodMemberScheme));

		this.properties = declaration.getProperties()
			.map(it => context.getMemberManager()
				.getMemberScheme(it, PropertyMemberScheme));

		this.typeParameters = declaration.getTypeParameters()
			.map(it => context.getDeclarationManager()
				.getQualifier(it));

		this.extends = declaration.getExtends()
			.map(it => context.getTypeManager()
				.getScheme(it.getType(), DeclaredTypeScheme));

		this.flags.addIf(declaration.isAmbient(), InterfaceScheme.FLAGS.IS_AMBIENT);
		this.flags.addIf(declaration.isNamedExport(), InterfaceScheme.FLAGS.IS_NAMED_EXPORT);
		this.flags.addIf(declaration.isDefaultExport(), InterfaceScheme.FLAGS.IS_DEFAULT_EXPORT);

		this.flags.freeze();
	}
}