import {Qualifier} from "../../qualifier/Qualifier";
import {Class} from "../utils/Class";
import {Schema} from "common/schema/Schema";

export abstract class AbstractReference<S extends Schema> {
	public abstract getQualifier(): Qualifier;
	public abstract isClassAllowed(Clazz: Class<unknown>): boolean;
	public abstract getValue(): S;
	public abstract isEmpty(): boolean;
}

