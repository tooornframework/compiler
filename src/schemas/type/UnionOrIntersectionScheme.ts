import {Node, Type} from "ts-morph";
import {BaseTypeScheme} from "./BaseTypeScheme";
import {CompilerContext} from "../../context/CompilerContext";

export class UnionOrIntersectionScheme extends BaseTypeScheme {

	public readonly kind: "UNION" | "INTERSECTION";
	public readonly members: Array<BaseTypeScheme>;

	public constructor(type: Type,  context: CompilerContext) {
		super();
		const isIntersection = type.isIntersection();

		if (!type.isUnion() && !isIntersection) {
			throw new Error("Wrong type");
		}

		this.kind = isIntersection ? "INTERSECTION" : "UNION";
		const members = isIntersection ? type.getIntersectionTypes() : type.getUnionTypes();
		this.members = members.map(it => context.getTypeManager().getScheme(it))
	}
}