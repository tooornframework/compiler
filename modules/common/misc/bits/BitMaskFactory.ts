import {BitMask} from "./BitMask";

export class BitMaskFactory {

	private static lastPower: number = 0;

	public next(): BitMask {
		return this.creator(Math.pow(2, BitMaskFactory.lastPower++));
	}

	public constructor(private creator: (bits: number) => BitMask) {

	}
}