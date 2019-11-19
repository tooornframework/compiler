import {Qualifier} from "../common/qualifier/Qualifier";
import {NamedSchema} from "./context/annotations/NamedSchema";

@NamedSchema
export class Schema {
	readonly qualifier: Qualifier;
}
