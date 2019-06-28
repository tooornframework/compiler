import {notNullOrThrow} from "./LangUtils";

class MatcherContainer<T> {
	public constructor(public ifSupplier: () => boolean, public valueConsumer: () => T) {
	}

}

class SelectorSyntax<T> {
	constructor(private consumer: (value: T) => void) {

	}

	public then(value: T): Selector<T> {
		this.consumer(value);
		return
	}


}

export class Selector<T> {
	public static new<T>(): Selector<T> {
		return new Selector<T>();
	}

	private matchers: Array<MatcherContainer<T>> = [];

	private constructor() {

	}

	public if(booleanSupplier: () => boolean): SelectorSyntax<T> {
		return new SelectorSyntax((value: T) => {
			this.matchers.push(new MatcherContainer<T>(booleanSupplier, () => value));
		});
	}

	public find(): NonNullable<T> {
		return notNullOrThrow(this.findNullable(), "No match found");
	}

	public findNullable(): T | null {
		return this.matchers
			.find(it => it.ifSupplier())
			.valueConsumer();
	}

	public hasMatch(): boolean {
		return this.matchers
			.some(it => it.ifSupplier());
	}
}