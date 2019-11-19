import {SchemeMapper} from "../SchemeMapper";
import {TypeGuards, VariableDeclaration, Node} from "ts-morph";
import {Mapper} from "../context/annotations/Mapper";

@Mapper
export class VariableToDeclarationsMapper extends SchemeMapper<VariableDeclaration, Node>{
	public intercept(x: VariableDeclaration): Array<Node> {
		return x.getType().getSymbol().getDeclarations();
	}

	public match(x: unknown): x is VariableDeclaration {
		return x instanceof Node && TypeGuards.isVariableDeclaration(x);
	}

}