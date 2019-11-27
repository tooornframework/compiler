import {Qualifier} from "./Qualifier";

export class RecycledQualifier extends Qualifier {
	public constructor(private recycledSym: string) {
		super();
	}
	public equals(other: any): boolean {
		return other instanceof Qualifier && other.sym() === this.sym();
	}

	public sym(): string {
		return this.recycledSym;
	}

}