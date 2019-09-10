import {QualifiedReference} from "./QualifiedReference";
import {Class} from "../utils/Class";
import {Qualifier} from "../qualifier/Qualifier";

export class EmptyQualifiedRefernce<S> extends QualifiedReference<S> {
	public getQualifier(): Qualifier {
		debugger;
		throw new Error("Empty reference");
	}

	public getValue(): S {
		debugger;
		throw new Error("Empty reference");
	}

	public isClassAllowed(Clazz: Class<unknown>): boolean {
		return false;
	}

	public isEmpty(): boolean {
		return true;
	}

}