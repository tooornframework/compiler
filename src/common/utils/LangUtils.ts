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