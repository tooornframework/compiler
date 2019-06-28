import {Qualifier} from "./Qualifier";

export class SetQualifier implements Qualifier {

	private readonly qualifiers: Array<Qualifier>;

	public constructor(qualifiers: Array<Qualifier>) {
		this.qualifiers = qualifiers
			.sort((it1, it2) => it1.sym() > it2.sym() ? -1 : 1);
	}

	public equals(other: any): boolean {
		if (!(other instanceof SetQualifier)) {
			return false;
		}

		return other.qualifiers
			.every((it, index) => it.equals(this.qualifiers[index]))
	}

	public sym(): string {
		return "NodeSetQualifier(" + this.qualifiers.map(it => it.sym()).join(" & ") + ")";
	}
}