import {SchemeMapper} from "../SchemeMapper";
import {TypeGuards, Node, InterfaceDeclaration} from "ts-morph";
import {Mapper} from "../context/annotations/Mapper";

@Mapper
export class InterfaceToInterfacesMapper extends SchemeMapper<InterfaceDeclaration, Node>{
	public intercept(x: InterfaceDeclaration): Array<Node> {
		return x.getType().getSymbol().getDeclarations();
	}

	public match(x: unknown): x is InterfaceDeclaration {
		return x instanceof Node && TypeGuards.isInterfaceDeclaration(x);
	}

}