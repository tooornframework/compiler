export abstract class Interceptor<I, O> {
	public abstract match(x: unknown): x is I;
	public abstract intercept(x: I): O | Array<O>;
}