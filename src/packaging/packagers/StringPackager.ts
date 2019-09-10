import {Packager} from "../Packager";
import {StringPackage} from "../package/StringPackage";

export class StringPackager extends Packager<string, StringPackage> {
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