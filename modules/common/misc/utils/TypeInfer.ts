export function TypeInfer(target: any, key: PropertyKey) {
    const defineOn = typeof target === "function" ? target.prototype : target;

    Object.defineProperty(defineOn, key, {
        get(): never {
            throw new Error("This property only used for type inferring");
        },
        set(): never {
            throw new Error("This property only used for type inferring");
        }
    })
}