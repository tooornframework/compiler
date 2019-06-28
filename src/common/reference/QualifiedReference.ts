import {Qualifier} from "../qualifier/Qualifier";
import {Class} from "../utils/Class";

export abstract class QualifiedReference<S> {
	public abstract getQualifier(): Qualifier;
	public abstract isClassAllowed(Clazz: Class<unknown>): boolean;
	public abstract getValue(): S;
	public abstract isEmpty(): boolean;
}

