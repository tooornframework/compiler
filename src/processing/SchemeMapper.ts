import {Injectable} from "../dependencies/annotations/Injectable";

@Injectable
export abstract class SchemeMapper<I, O> {
	public abstract match(x: unknown): x is I;
	public abstract intercept(x: I): O | Array<O>;
}