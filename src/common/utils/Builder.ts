import {MappedType} from "./MappedType";
import { NoArgsConstructorClass} from "./Class";


export class Builder<S> {
	public static of<S>(Clazz: NoArgsConstructorClass<S>): Builder<S> {
		return new Builder(Clazz);
	}

	private values: MappedType<S>;

	public constructor(private readonly Clazz: NoArgsConstructorClass<S>) {

	}

	public set(values: MappedType<S>): this {
			this.values = values;
			return this;
	}

	public setAndBuild(values: MappedType<S>) {
		return this.set(values).build();
	}

	public build(): S {
		const c = new this.Clazz();

		Object.keys(this.values).forEach(it => {
			c[it] = this.values[it];
		});

		return c;
	}
}
