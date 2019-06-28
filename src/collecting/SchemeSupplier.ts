import {Qualifier} from "../common/qualifier/Qualifier";
import {Schema} from "../schema/Schema";

export class SchemeSupplier<N, S extends Schema> {
	public constructor(private readonly qualifier: Qualifier | null, private readonly schemeSupplier: (q: Qualifier) => S) {

	}

	public isQualified() {
		return !!this.qualifier;
	}

	public sym(): string {
		return this.getQualifier().sym();
	}

	public isQualifierIn(values: Array<string> | Set<string>): boolean {
		if (!this.isQualified()) {
			return false;
		}

		return Array.isArray(values) ? values.includes(this.sym()) : values.has(this.sym());
	}

	public getQualifier(): Qualifier {
		if (!this.isQualified()) {
			throw new Error("Is not qualifier");
		}

		return this.qualifier;
	}

	public supply(): S {
		return this.schemeSupplier(this.qualifier)
	}
}