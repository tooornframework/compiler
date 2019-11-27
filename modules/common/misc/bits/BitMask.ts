import {BitMaskFactory} from "./BitMaskFactory";
import * as UUID from "uuid";
export class BitMask {

	public static empty(): BitMask {
		return new BitMask(0);
	}

	public static flags<T>(action: (factory: BitMaskFactory) => T): T {
		return action(new BitMaskFactory(b => new BitMask(b)));
	}

	private isFrozen: boolean = false;

	private containedMasks: Set<string> = new Set<string>();

	private id: string = UUID.v4();

	private constructor(private bits: number) {

	}

	public toBits(): number {
		return this.bits;
	}

	public addIf(condition: boolean, bm: BitMask): this {
		return condition ? this.add(bm) : this;
	}

	public addAndFreezeIf(condition: boolean, bm: BitMask): this {
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

	public hasOneOf(...bms: Array<BitMask>): boolean {
		return bms.some((bm) => this.has(bm))
	}

	public hasAllOf(...bms: Array<BitMask>): boolean {
		return bms.every((bm) => this.has(bm))
	}

	public doIfHas(bm: BitMask, cb: () => void): void {
		if (this.has(bm)) {
			cb();
		}
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

	public isEmpty(): boolean {
		return this.bits === 0;
	}

	public freeze(): this {
		this.isFrozen = true;
		return this;
	}

	public freezeOrThrowIfEmpty(message: string): this {
		if (this.isEmpty()) {
			throw new Error(message || "Empty bitmask :( ");
		}

		this.isFrozen = true;
		return this;
	}
}

