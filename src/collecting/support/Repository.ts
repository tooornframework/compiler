import {Schema} from "../../schema/Schema";
import {Qualifier} from "../../common/qualifier/Qualifier";

export class Repository {
	private map = new Map<string, Schema>();

	public set(scheme: Schema): void {
		this.map.set(scheme.qualifier.sym(), scheme);
	}

	public get(qualifier: Qualifier): Schema {
		return this.map.get(qualifier.sym());
	}

	public keys(): Array<string> {
		return Array.from(this.map.keys());
	}

	public values(): Array<Schema> {
		return Array.from(this.map.values());
	}
}