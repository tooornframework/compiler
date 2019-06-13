import { Node } from "ts-morph";
import {TypeManager} from "./managers/TypeManager";
import {MemberManager} from "./managers/MemberManager";
import {DeclarationManager} from "./managers/DeclarationManager";
import {CompilerRepository} from "./CompilerRepository";


export class CompilerContext {


	private readonly types: TypeManager;
	private readonly members: MemberManager;
	private readonly declarations: DeclarationManager;


	public constructor(private repository: CompilerRepository) {
		this.types = new TypeManager(this);
		this.members = new MemberManager(this);
		this.declarations = new DeclarationManager(this, repository);
	}

	public getTypeManager() {
		return this.types;
	}

	public getMemberManager() {
		return this.members;
	}

	public getDeclarationManager() {
		return this.declarations;
	}

	public process(node: Node) {
		this.getDeclarationManager().getQualifier(node);
	}
}