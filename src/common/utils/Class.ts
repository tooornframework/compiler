export type Class<T> = (new (...args) => T) | ({ prototype: T, name: string } & Function);
export type AbstractClass<T> = { prototype: T  }
export type NoArgsConstructorClass<T> = new () => T;