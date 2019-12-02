export interface BiAction<T, TT> {
    (x: T, y: TT): void
}