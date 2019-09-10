import {Packager} from "../Packager";
import {BooleanPackage} from "../package/BooleanPackage";

export class BooleanPackager extends Packager<boolean, BooleanPackage>{
	public unpack(pkg: BooleanPackage): boolean {
		return Boolean(pkg.v);
	}

	public matchUnpacked(value: unknown): value is boolean {
		return typeof value === "boolean";
	}

	public packageId(): 3 {
		return 3;
	}

	public toPackedValue(value: boolean): 1 | 0 {
		return value ? 1 : 0;
	}
}