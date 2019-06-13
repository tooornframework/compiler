import {PropertyMemberScheme} from "../members/PropertyMemberScheme";
import {MethodMemberScheme} from "../members/MethodMemberScheme";
import {BaseDeclarationScheme} from "./BaseDeclarationScheme";
import {ClassDeclaration, SyntaxKind} from "ts-morph";
import {BitMaskFactory} from "../../common/bits/BitMaskFactory";
import {DeclaredTypeScheme} from "../type/DeclaredTypeScheme";
import {CompilerContext} from "../../context/CompilerContext";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {BaseTypeScheme} from "../type/BaseTypeScheme";


export class ClassScheme extends BaseDeclarationScheme {

	public static readonly FLAGS = BitMaskFactory.create(factory => ({
		IS_DEFAULT_EXPORT: factory.next(),
		IS_NAMED_EXPORT: factory.next(),
		IS_ABSTRACT: factory.next(),
		IS_AMBIENT: factory.next(),
	}));

	public readonly typeParameters: ReadonlyArray<Qualifier> = [];

	public readonly extends: DeclaredTypeScheme;

	public readonly implements: ReadonlyArray<DeclaredTypeScheme>;

	public readonly properties: ReadonlyArray<PropertyMemberScheme>;

	public readonly methods: ReadonlyArray<MethodMemberScheme>;

	public readonly decorators: ReadonlyArray<BaseTypeScheme>;

	public constructor(declaration: ClassDeclaration, context: CompilerContext) {
		super(declaration, context);

		this.methods = declaration.getMethods()
			.map(it => context.getMemberManager().getMemberScheme(it, MethodMemberScheme));

		this.properties = declaration.getProperties()
			.map(it => context.getMemberManager().getMemberScheme(it, PropertyMemberScheme));

		this.decorators = declaration.getDecorators()
			.map(it => context.getTypeManager().getScheme(it.getType()));

		this.typeParameters = declaration.getTypeParameters()
			.map(it => context.getDeclarationManager().getQualifier(it));

		this.implements = declaration.getImplements()
			.map(it => context.getTypeManager().getScheme(it.getType(), DeclaredTypeScheme));

		if (declaration.getExtends()) {
			this.extends = context.getTypeManager().getScheme(declaration.getExtends().getType(), DeclaredTypeScheme);
		}

		this.flags.addIf(declaration.isAmbient(), ClassScheme.FLAGS.IS_AMBIENT);
		this.flags.addIf(declaration.isAbstract(), ClassScheme.FLAGS.IS_ABSTRACT);
		this.flags.addIf(declaration.isNamedExport(), ClassScheme.FLAGS.IS_NAMED_EXPORT);
		this.flags.addIf(declaration.isDefaultExport(), ClassScheme.FLAGS.IS_DEFAULT_EXPORT);
		this.flags.freeze();
	}
}