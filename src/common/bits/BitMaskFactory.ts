import {BitMask} from "./BitMask";

export class BitMaskFactory {

	public static create<T>(action: (factory: BitMaskFactory) => T): T {
		return action(new BitMaskFactory());
	}

	private lastPower = 0;

	public next(): BitMask {
		return new BitMask(Math.pow(2, this.lastPower++));
	}
}