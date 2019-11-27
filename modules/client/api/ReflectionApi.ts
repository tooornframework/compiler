import {AbstractPackager} from "common/packaging/AbstractPackager";
import {Package} from "common/packaging/Package";

export class ReflectionApi {
	private definitions: Array<any> = [];

	private map: Map<any, any> = new Map<any, any>();

	public definition(def: any) {
		this.definitions = this.definitions.concat(def);
	}

	public reference(ref: any, qual: any) {
		this.map.set(qual, ref);
	}

	public defineNameRegistry(nr: any): this {
		return this;
	}

	public get(ref: any): any {
		return this.definitions
			.map(it => this.getPackager().unpack(it));
	}

	private getPackager(): AbstractPackager<unknown, Package<number, unknown>> {
		throw new Error("aaaa")
	}
}