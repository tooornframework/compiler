import {AbstractPackager} from "../AbstractPackager";
import {BooleanPackage} from "../package/BooleanPackage";
import {Packager} from "../context/annotations/Packager";

@Packager
export class BooleanPackager extends AbstractPackager<boolean, BooleanPackage>{
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