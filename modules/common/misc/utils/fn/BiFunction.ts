export interface BiFunction<T, TT, R> {
    (x: T, y: TT): R;
}