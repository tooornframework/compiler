import {
	ClassDeclaration,
	EnumDeclaration,
	FunctionDeclaration,
	FunctionTypeNode,
	InterfaceDeclaration,
	Node,
	SyntaxKind,
	Type,
	TypeAliasDeclaration,
	TypeLiteralNode,
	TypeParameterDeclaration
} from "ts-morph";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {NodeQualifier} from "../../common/qualifier/NodeQualifier";
import {BaseDeclarationScheme} from "../../schemas/declaration/BaseDeclarationScheme";
import {notNullOrThrow} from "../../common/utils/LangUtils";
import {ClassScheme} from "../../schemas/declaration/ClassScheme";
import {InterfaceScheme} from "../../schemas/declaration/InterfaceScheme";
import {TypeAliasScheme} from "../../schemas/declaration/TypeAliasScheme";
import {EnumScheme} from "../../schemas/declaration/EnumScheme";
import {TypeParameterScheme} from "../../schemas/declaration/TypeParameterScheme";
import {FunctionScheme} from "../../schemas/declaration/FunctionScheme";
import {TypeLiteralScheme} from "../../schemas/declaration/TypeLiteralScheme";
import {CompilerContext} from "../CompilerContext";
import {isTypeDeclarable} from "../TypeUtils";
import {CompilerRepository} from "../CompilerRepository";

export class DeclarationManager {
	private static readonly KIND_TO_DECLARATION_SCHEME = new Map<SyntaxKind, (node: Node, context: CompilerContext) => BaseDeclarationScheme>([
		[SyntaxKind.ClassDeclaration, (it: ClassDeclaration, context: CompilerContext) => new ClassScheme(it, context)],
		[SyntaxKind.InterfaceDeclaration, (it: InterfaceDeclaration, context: CompilerContext) => new InterfaceScheme(it, context)],
		[SyntaxKind.TypeAliasDeclaration, (it: TypeAliasDeclaration, context: CompilerContext) => new TypeAliasScheme(it, context)],
		[SyntaxKind.EnumDeclaration, (it: EnumDeclaration, context: CompilerContext) => new EnumScheme(it, context)],
		[SyntaxKind.TypeParameter, (it: TypeParameterDeclaration, context: CompilerContext) => new TypeParameterScheme(it, context)],
		[SyntaxKind.FunctionType, (it: FunctionTypeNode, context: CompilerContext) => new FunctionScheme(it, context)],
		[SyntaxKind.FunctionDeclaration, (it: FunctionDeclaration, context: CompilerContext) => new FunctionScheme(it, context)],
		[SyntaxKind.TypeLiteral, (it: TypeLiteralNode, context: CompilerContext) => new TypeLiteralScheme(it, context)],
		[SyntaxKind.MappedType, (it: TypeLiteralNode, context: CompilerContext) => new TypeLiteralScheme(it, context)]

	]);

	private static readonly KIND_TO_EXTRACTOR = new Map<SyntaxKind, (node: Node) => Array<Node>>([
		[SyntaxKind.VariableDeclaration, node => node.getType().getSymbol().getDeclarations()]
	]);


	private knownDeclarationQualifiers = new Set<string>();


	public constructor(private readonly context: CompilerContext, private repository: CompilerRepository) {

	}


	public getQualifiers(type: Type): Array<Qualifier> {
		if (!isTypeDeclarable(type)) {
			throw new Error("Type is not declarable");
		}

		return type.getSymbol().getDeclarations()
			.map(it => this.extractTargetsFromNode(it))
			.reduce((acc, it) => acc.concat(it))
			.filter(it => this.isValidDeclarationNode(it))
			.map(it => this.getQualifier(it))
	}

	public getQualifier(node: Node): Qualifier {
		if (!this.isValidDeclarationNode(node)) {
			throw new Error("Node is invalid");
		}

		const qualifier = new NodeQualifier(node);

		if (this.knownDeclarationQualifiers.has(qualifier.hash())) {
			return qualifier;
		}

		this.knownDeclarationQualifiers.add(qualifier.hash());

		const scheme = this.selectDeclarationScheme(node);

		if (!qualifier.equals(scheme.qualifier)) {
			throw new Error("Qualifiers are different");
		}

		this.repository.add(scheme);

		return qualifier;
	}

	private extractTargetsFromNode(node: Node): Array<Node> {
		if (DeclarationManager.KIND_TO_EXTRACTOR.has(node.getKind())) {
			return DeclarationManager.KIND_TO_EXTRACTOR.get(node.getKind())(node);
		}

		return Array.of(node);
	}

	private isValidDeclarationNode(node: Node): boolean {
		if (node.getKind() === SyntaxKind.MappedType) {
			return false;
		}

		return DeclarationManager.KIND_TO_DECLARATION_SCHEME.has(node.getKind());
	}

	private selectDeclarationScheme(node: Node): BaseDeclarationScheme {
		const schemeCreator = notNullOrThrow(DeclarationManager.KIND_TO_DECLARATION_SCHEME.get(node.getKind()));
		return schemeCreator(node, this.context);
	}
}