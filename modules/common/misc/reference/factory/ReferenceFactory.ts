import {Qualifier} from "../../../qualifier/Qualifier";
import {AbstractReference} from "../AbstractReference";
import {Class} from "../../utils/Class";
import {RegularReference} from "../RegularReference";
import {EmptyRefernce} from "../EmptyRefernce";
import {Schema} from "common/schema/Schema";

export class ReferenceFactory {

	public constructor(private lookUp: (c: Qualifier) => unknown) {

	}


	public from<C extends Schema>(qualifier: Qualifier, Class: Array<Class<C>>): AbstractReference<C> {
		return new RegularReference(qualifier, this.lookUp, Class);
	}

	public empty<C extends Schema>(): AbstractReference<C> {
		return new EmptyRefernce();
	}
}