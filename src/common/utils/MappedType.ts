export type MappedType<T> = {
	[K in keyof T]: T[K]
}