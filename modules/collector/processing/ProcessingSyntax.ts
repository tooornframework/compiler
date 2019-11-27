import {NoArgsConstructorClass} from "common/misc/utils/Class";
import {AbstractReference} from "common/misc/reference/AbstractReference";

export class ProcessingSyntax<S> {
	public static for(executor: (Class: Array<NoArgsConstructorClass<any>>, value: any) => AbstractReference<any>): ProcessingSyntax<never> {
		return new ProcessingSyntax(executor) as ProcessingSyntax<never>;
	}


	private readonly currentClasses: Array<NoArgsConstructorClass<any>>;
	private readonly executor: (Class: Array<NoArgsConstructorClass<any>>, value: any) => AbstractReference<S>;

	private constructor(executor: (Class: Array<NoArgsConstructorClass<any>>, value: any) => AbstractReference<S>, currentClasses: Array<NoArgsConstructorClass<S>> = []) {
		this.executor = executor;
		this.currentClasses = currentClasses.slice();
	}


	public value<N>(value: N): S extends never ? never : AbstractReference<S> {
		if (!this.currentClasses.length) {
			throw new Error("Cannot cast, no classes found");

		}

		return this.executor(this.currentClasses, value) as any;
	}

	public all<N>(values: Array<N>): S extends never ? never : Array<AbstractReference<S>> {
		if (!this.currentClasses.length) {
			throw new Error("Cannot cast, no classes found");

		}

		return values.map(it => this.executor(this.currentClasses, it)) as any;
	};


	public allFiltered<N>(values: Array<N>, filter: (value: N) => boolean): S extends never ? never : Array<AbstractReference<S>> {
		return this.all(values.filter(filter))
	};

	public as<N>(Clazz: NoArgsConstructorClass<N>): ProcessingSyntax<N | S> {
		return new ProcessingSyntax(this.executor, this.currentClasses.concat(Clazz));
	}

	public ifPresent<N>(value: N): S extends never ? never : (AbstractReference<S> | null) {
		if (!value) {
			return null;
		}

		return this.value(value);
	}
}
