import {Qualifier} from "./Qualifier";
import {Type} from "ts-morph";

export class TypeQualifier extends Qualifier {

	public constructor(private readonly type: Type) {
		super();
	}

	public equals(other: any): boolean {
		if (!(other instanceof TypeQualifier)) {
			return false;
		}

		return this.sym() === other.sym();
	}

	public sym(): string {
		// @ts-ignore
		return "TypeQualifier(" + this.type.compilerType.id.toString() + ")";
	}

}