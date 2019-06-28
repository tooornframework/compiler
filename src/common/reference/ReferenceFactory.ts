import {Qualifier} from "../qualifier/Qualifier";
import {QualifiedReference} from "./QualifiedReference";
import {Class} from "../utils/Class";
import {SimpleQualifiedReference} from "./SimpleQualifiedReference";
import {EmptyQualifiedRefernce} from "./EmptyQualifiedRefernce";

export class ReferenceFactory {

	public constructor(private lookUp: (c: Qualifier) => unknown) {

	}


	public qualified<C>(qualifier: Qualifier, Class: Array<Class<C>>): QualifiedReference<C> {
		return new SimpleQualifiedReference(qualifier, this.lookUp, Class);
	}

	public empty<C>(): QualifiedReference<C> {
		return new EmptyQualifiedRefernce();
	}
}