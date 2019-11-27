import {AbstractPackager} from "../AbstractPackager";
import {StringPackage} from "../package/StringPackage";
import {Packager} from "../context/annotations/Packager";

@Packager
export class StringPackager extends AbstractPackager<string, StringPackage> {
	public unpack(pkg: StringPackage): string {
		return pkg.v;
	}

	public matchUnpacked(value: unknown): value is string {
		return typeof value === "string";
	}

	public packageId(): number {
		return 2;
	}

	public toPackedValue(value: string): string {
		return value;
	}

}