import {Schema} from "common/schema/Schema";
import {ProcessingManager} from "./ProcessingManager";
import {Qualifier} from "common/qualifier/Qualifier";
import {Class} from "common/misc/utils/Class";
import {Injectable} from "common/dependencies/annotations/Injectable";

@Injectable
export abstract class SchemaBuilder<N, S extends Schema> {
	public abstract qualifier(n: N): Qualifier;
	public abstract build(q: Qualifier, n: N, manager: ProcessingManager): S;
	public abstract match(n: unknown, manager: ProcessingManager): n is N;
	public abstract schema(): Class<S>;
}
