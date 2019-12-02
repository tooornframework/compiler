export interface Action<T> {
    (value: T): void
}