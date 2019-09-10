import {NoArgsConstructorClass} from "../common/utils/Class";
import {QualifiedReference} from "../common/reference/QualifiedReference";

export class BuildProcessingSyntax<S> {
	public static for(executor: (Class: Array<NoArgsConstructorClass<any>>, value: any) => QualifiedReference<any>): BuildProcessingSyntax<never> {
		return new BuildProcessingSyntax(executor) as BuildProcessingSyntax<never>;
	}


	private readonly currentClasses: Array<NoArgsConstructorClass<any>>;
	private readonly executor: (Class: Array<NoArgsConstructorClass<any>>, value: any) => QualifiedReference<S>;
	private readonly empty: () => QualifiedReference<S>;

	private constructor(executor: (Class: Array<NoArgsConstructorClass<any>>, value: any) => QualifiedReference<S>, currentClasses: Array<NoArgsConstructorClass<S>> = []) {
		this.executor = executor;
		this.currentClasses = currentClasses.slice();
	}


	public value<N>(value: N): S extends never ? never : QualifiedReference<S> {
		if (!this.currentClasses.length) {
			throw new Error("Cannot cast, no classes found");

		}

		return this.executor(this.currentClasses, value) as any;
	}

	public all<N>(values: Array<N>): S extends never ? never : Array<QualifiedReference<S>> {
		if (!this.currentClasses.length) {
			throw new Error("Cannot cast, no classes found");

		}

		return values.map(it => this.executor(this.currentClasses, it)) as any;
	};


	public allFiltered<N>(values: Array<N>, filter: (value: N) => boolean): S extends never ? never : Array<QualifiedReference<S>> {
		return this.all(values.filter(filter))
	};

	public as<N>(Clazz: NoArgsConstructorClass<N>): BuildProcessingSyntax<N | S> {
		return new BuildProcessingSyntax(this.executor, this.currentClasses.concat(Clazz));
	}

	public ifPresent<N>(value: N): S extends never ? never : (QualifiedReference<S> | null) {
		if (!value) {
			return null;
		}

		return this.value(value);
	}
}
