import {Interceptor} from "../Interceptor";
import {TypeGuards, VariableDeclaration, Node} from "ts-morph";

export class VariableToDeclarationsInterceptor extends Interceptor<VariableDeclaration, Node>{
	public intercept(x: VariableDeclaration): Array<Node> {
		return x.getType().getSymbol().getDeclarations();
	}

	public match(x: unknown): x is VariableDeclaration {
		return x instanceof Node && TypeGuards.isVariableDeclaration(x);
	}

}