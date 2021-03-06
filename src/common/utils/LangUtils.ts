import {Json} from "./Json";
import {Hash, MappedType} from "./MappedType";
import {Class} from "./Class";

export function ifNotNull<T>(x: T, cb: (x: NonNullable<T>) => void) {
	if (x !== null && x !== undefined) {
		cb(x as NonNullable<T>);
	}
}

export function notNullOrThrow<T>(x: T, errorSupplierOrMessage: (() => Error) | string = "NPE"): NonNullable<T> {
	if (x !== null && x !== undefined) {
		return x as NonNullable<T>;
	}

	if (typeof errorSupplierOrMessage === "string") {
		throw new Error(errorSupplierOrMessage);
	}

	throw errorSupplierOrMessage();
}

export function toEnum<E, K extends keyof E>(value: string, Enum: E): E[K] {
	if (value in Enum) {
		return (Enum as any)[value];
	}

	throw new TypeError("Key is not present in given enum");
}


export function mapToObj<J>(x: Map<string, J>): Hash<J> {
	return Array.from(x.keys()).reduce((acc, value) => {
		acc[value] = x.get(value);
		return acc;
	}, {} as Hash<J>)
}

export function toJson(x: object): Json {
	return JSON.parse(JSON.stringify(x));
}

export function assertAll<T>(values: Array<unknown>, predicate: (v: unknown) => v is T): Array<T> {
	return values.map(it => {
		if (predicate(it)) {
			return it;
		}
		throw new Error("Assertion failure");
	})
}

export function curriedIsInstanceOf<T>(Clazz: Class<T>) {
	return (value: unknown): value is T => {
		return value instanceof Clazz;
	}
}