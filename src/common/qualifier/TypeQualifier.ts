import {Qualifier} from "./Qualifier";
import {Type} from "ts-morph";

export class TypeQualifier implements Qualifier {

	public constructor(private readonly type: Type) {

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