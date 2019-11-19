import {Schema} from "../schema/Schema";
import {QualifiedReference} from "../common/reference/QualifiedReference";
import {Qualifier} from "../common/qualifier/Qualifier";
import {Class} from "../common/utils/Class";
import {Injectable} from "../dependencies/annotations/Injectable";

@Injectable
export abstract class SchemeReducer<T extends Schema, S extends Schema> {
	public abstract match(values: Array<QualifiedReference<Schema>>): values is Array<QualifiedReference<T>>;
	public abstract reduce(q: Qualifier, values: Array<QualifiedReference<T>>): S;
	public abstract qualifier(values: Array<QualifiedReference<T>>): Qualifier;
	public abstract schema(): Class<S>;
}