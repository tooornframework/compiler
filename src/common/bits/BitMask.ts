export class BitMask {

	public static empty(): BitMask {
		return new BitMask(0);
	}

	private isFrozen = false;

	public constructor(private bits: number) {

	}

	public toBits(): number {
		return this.bits;
	}

	public addIf(condition: boolean, bm: BitMask): this {
		return condition ? this.add(bm) : this;
	}

	public add(bm: BitMask): this {
		if (this.isFrozen) {
			throw new Error("Cannot update frozen BitMask");
		}

		this.bits = (this.bits | bm.bits);
		return this;
	}

	public has(bm: BitMask): boolean {
		return Boolean(this.bits & bm.bits);
	}

	public hasOneOf(...bms: Array<BitMask>) {
		return bms.some((bm) => this.has(bm))
	}

	public hasAllOf(...bms: Array<BitMask>) {
		return bms.every((bm) => this.has(bm))
	}

	public clone(): BitMask {
		return new BitMask(this.bits);
	}

	public equals(other: any): boolean {
		if (!(other instanceof BitMask)) {
			return false;
		}

		return other.bits === this.bits;
	}

	public isEmpty() {
		return this.bits === 0;
	}

	public freeze(): void {
		this.isFrozen = true;
	}
}

