import {Schema} from "common/schema/Schema";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {Qualifier} from "common/qualifier/Qualifier";
import {Class} from "common/misc/utils/Class";
import {Injectable} from "common/dependencies/annotations/Injectable";

@Injectable
export abstract class SchemeReducer<T extends Schema, S extends Schema> {
	public abstract match(values: Array<AbstractReference<Schema>>): values is Array<AbstractReference<T>>;
	public abstract reduce(q: Qualifier, values: Array<AbstractReference<T>>): S;
	public abstract qualifier(values: Array<AbstractReference<T>>): Qualifier;
	public abstract schema(): Class<S>;
}