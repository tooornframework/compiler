import {Schema} from "../schema/Schema";
import {BuildManager} from "./BuildManager";
import {Qualifier} from "../common/qualifier/Qualifier";
import {Class} from "../common/utils/Class";
import {Injectable} from "../dependencies/annotations/Injectable";

@Injectable
export abstract class SchemaBuilder<N, S extends Schema> {
	public abstract qualifier(n: N): Qualifier;
	public abstract build(q: Qualifier, n: N, manager: BuildManager): S;
	public abstract match(n: unknown, manager: BuildManager): n is N;
	public abstract schema(): Class<S>;
}
