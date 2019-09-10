import {MappedType} from "./MappedType";
import { NoArgsConstructorClass} from "./Class";


export class Builder<S> {
	public static of<S>(Clazz: NoArgsConstructorClass<S>): Builder<S> {
		return new Builder(Clazz);
	}

	public static ofInterface<S>(): Builder<S> {
		return new Builder();
	}

	private values: MappedType<S> = {} as MappedType<S>;

	public constructor(private readonly Clazz?: NoArgsConstructorClass<S>) {

	}

	public setAny(key: string, values: any): this {
		this.values[key] = values;
		return this;
	}

	public set(values: MappedType<S>): this {
			this.values = values;
			return this;
	}

	public setAndBuild(values: MappedType<S>) {
		return this.set(values).build();
	}

	public build(): S {
		const c = this.Clazz ? new this.Clazz() : {};

		Object.keys(this.values).forEach(it => {
			c[it] = this.values[it];
		});

		return c as S;
	}
}
