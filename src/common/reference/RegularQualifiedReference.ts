import {Qualifier} from "../qualifier/Qualifier";
import {notNullOrThrow} from "../utils/LangUtils";
import {Class} from "../utils/Class";
import {QualifiedReference} from "./QualifiedReference";

export class RegularQualifiedReference<S> extends QualifiedReference<S> {
	private allowedClasses: Array<Class<S>>;

	public constructor(private readonly qualifier: Qualifier, private lookup: (qualifier: Qualifier) => unknown, classes?: Array<Class<S>>) {
		super();
		this.allowedClasses =  classes ? [].concat(classes) : [];
	}

	public getQualifier(): Qualifier {
		return this.qualifier;
	}

	public isClassAllowed(Clazz: Class<unknown>): boolean{
		return !!this.allowedClasses.find(it => it === Clazz || it.prototype instanceof Clazz);
	}

	public getValue(): S {
		const value = notNullOrThrow(this.lookup(this.qualifier), "Unable to get reference");

		if (!this.allowedClasses.length) {
			throw new Error("Class list is empty");
		}

		const hasMatch = this.allowedClasses
			.some(Clazz => value instanceof Clazz);

		if (hasMatch) {
			return value as S;
		}

		throw new Error("Invalid class");
	}

	public isEmpty(): boolean {
		return !this.lookup(this.qualifier);
	}
}

