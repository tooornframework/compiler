import {Interceptor} from "../Interceptor";
import {TypeGuards, Node, InterfaceDeclaration} from "ts-morph";

export class VariableToDeclarationsInterceptor extends Interceptor<InterfaceDeclaration, Node>{
	public intercept(x: InterfaceDeclaration): Array<Node> {
		return x.getType().getSymbol().getDeclarations();
	}

	public match(x: unknown): x is InterfaceDeclaration {
		return x instanceof Node && TypeGuards.isInterfaceDeclaration(x);
	}

}