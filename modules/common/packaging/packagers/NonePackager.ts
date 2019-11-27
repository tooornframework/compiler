import {AbstractPackager} from "../AbstractPackager";
import {NonePackage} from "../package/NonePackage";
import {Packager} from "../context/annotations/Packager";

@Packager
export class NonePackager extends AbstractPackager<undefined | null, NonePackage> {
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