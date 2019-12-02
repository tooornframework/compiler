import {AbstractPackager} from "../AbstractPackager";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {EmptyReferencePackage} from "../package/EmptyReferencePackage";
import {Packager} from "../context/annotations/Packager";

@Packager
export class EmptyReferencePackager extends AbstractPackager<AbstractReference<unknown>, EmptyReferencePackage> {
	public unpack(): AbstractReference<unknown> {
		return this.getManager().getRefFactory().empty();
	}

	public toPackedValue(value: AbstractReference<unknown>): number {
		return 0;
	}

	public matchUnpacked(value: unknown): value is AbstractReference<unknown> {
		return value instanceof AbstractReference && value.isEmpty();
	}

	public packageId(): number {
		return 8;
	}

}