import {EnumMember, MethodDeclaration, Node, PropertyDeclaration, SyntaxKind} from "ts-morph";
import {BaseMemberScheme} from "../../schemas/members/BaseMemberScheme";
import {PropertyMemberScheme} from "../../schemas/members/PropertyMemberScheme";
import {MethodMemberScheme} from "../../schemas/members/MethodMemberScheme";
import {EnumMemberScheme} from "../../schemas/members/EnumMemberScheme";
import {CompilerContext} from "../CompilerContext";
import {notNullOrThrow} from "../../common/utils/LangUtils";
import {Class} from "../../common/utils/Class";

export class MemberManager {
	private static readonly KIND_TO_MEMBER_SCHEME = new Map<SyntaxKind, (node: Node, context: CompilerContext) => BaseMemberScheme>([
		[SyntaxKind.PropertyDeclaration, (it: PropertyDeclaration, context: CompilerContext) => new PropertyMemberScheme(it, context)],
		[SyntaxKind.PropertySignature, (it: PropertyDeclaration, context: CompilerContext) => new PropertyMemberScheme(it, context)],
		[SyntaxKind.MethodDeclaration, (it: MethodDeclaration, context: CompilerContext) => new MethodMemberScheme(it, context)],
		[SyntaxKind.MethodSignature, (it: MethodDeclaration, context: CompilerContext) => new MethodMemberScheme(it, context)],
		[SyntaxKind.EnumMember, (it: EnumMember, context: CompilerContext) => new EnumMemberScheme(it, context)]
	]);

	public constructor(private readonly context: CompilerContext) {

	}

	public getMemberScheme<T extends BaseMemberScheme>(node: Node, Clazz: Class<T>): T {

		const creator = notNullOrThrow(MemberManager.KIND_TO_MEMBER_SCHEME.get(node.getKind()), "Unknown node");

		const scheme = creator(node, this.context);

		if (!(scheme instanceof Clazz)) {
			throw new Error("Invalid cast");
		}

		return scheme;
	}
}