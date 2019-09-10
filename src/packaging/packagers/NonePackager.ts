import {Packager} from "../Packager";
import {NonePackage} from "../package/NonePackage";

export class NonePackager extends Packager<undefined | null, NonePackage> {
	public unpack(pkg: NonePackage): null | undefined {
		return pkg.v;
	}

	public matchUnpacked(value: unknown): value is null | undefined {
		return value === null || value === undefined;
	}

	public packageId(): number {
		return 5;
	}

	public toPackedValue(value: null | undefined): null | undefined {
		return value;
	}

}