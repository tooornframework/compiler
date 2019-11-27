export type MappedType<T> = {
	[K in keyof T]: T[K]
}

export type Hash<V> = {
	[k: string]: V;
}