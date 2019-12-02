import {Qualifier} from "common/qualifier/Qualifier";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {Class} from "common/misc/utils/Class";
import {Schema} from "common/schema/Schema";

export abstract class AbstractReferenceFactory {
	public abstract from<C extends Schema>(qualifier: Qualifier, Class: Array<Class<C>>): AbstractReference<C>;
	public abstract empty<C extends Schema>(): AbstractReference<C>;
}
