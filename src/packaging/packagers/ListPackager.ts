import {Packager} from "../Packager";
import {ListPackage} from "../package/ListPackage";
import {Package} from "../Package";

export class ListPackager extends Packager<Array<unknown>, ListPackage> {
	public unpack(pkg: ListPackage): Array<unknown> {
		return pkg.v.map(it => this.manager.unpack(it))
	}

	public toPackedValue(value: Array<unknown>): Array<Package<number, unknown>> {
		return value.map(it => this.manager.pack(it));
	}

	public matchUnpacked(value: unknown): value is Array<unknown> {
		return Array.isArray(value);
	}

	public packageId(): number {
		return 4;
	}

}