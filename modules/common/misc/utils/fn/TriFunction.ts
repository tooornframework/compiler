export interface TriFunction<T, TT, TTT, R> {
    (x: T, y: TT, z: TTT): R
}