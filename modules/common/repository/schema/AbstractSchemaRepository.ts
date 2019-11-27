import {Schema} from "../../schema/Schema";
import {Qualifier} from "../../qualifier/Qualifier";

export abstract class AbstractSchemaRepository {
	public abstract set(scheme: Schema): void;
	public abstract get(qualifier: Qualifier): Schema;
	public abstract values(): Array<Schema>;
}