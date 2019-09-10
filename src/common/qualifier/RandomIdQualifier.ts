import {Qualifier} from "./Qualifier";
import { v4 } from "uuid";
export class RandomIdQualifier extends Qualifier {
	private id = v4();

	public equals(other: any): boolean {
		if (!(other instanceof RandomIdQualifier)) {
			return false;
		}

		return this.id === other.id;
	}

	public sym(): string {
		return this.id;
	}

}