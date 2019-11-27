import {AbstractPackager} from "../AbstractPackager";
import {ListPackage} from "../package/ListPackage";
import {Package} from "../Package";
import {Packager} from "../context/annotations/Packager";

@Packager
export class ListPackager extends AbstractPackager<Array<unknown>, ListPackage> {
	public unpack(pkg: ListPackage): Array<unknown> {
		return pkg.v.map(it => this.getManager().unpack(it))
	}

	public toPackedValue(value: Array<unknown>): Array<Package<number, unknown>> {
		return value.map(it => this.getManager().pack(it));
	}

	public matchUnpacked(value: unknown): value is Array<unknown> {
		return Array.isArray(value);
	}

	public packageId(): number {
		return 4;
	}

}