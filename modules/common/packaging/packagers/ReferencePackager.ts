import {AbstractPackager} from "../AbstractPackager";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {ReferencePackage} from "../package/ReferencePackage";
import {RegularReference} from "../../misc/reference/RegularReference";
import {RecycledQualifier} from "../../qualifier/RecycledQualifier";

import {Packager} from "../context/annotations/Packager";

@Packager
export class ReferencePackager extends AbstractPackager<AbstractReference<unknown>, ReferencePackage> {


	public unpack(pkg: ReferencePackage): AbstractReference<unknown> {
		const qualifier = new RecycledQualifier(this.getManager().getStringsRepository().find(pkg.v));

		return new RegularReference(qualifier, () => {
			throw new Error("References search is not implemented now");
		});
	}

	public toPackedValue(value: AbstractReference<unknown>): number {
		return this.getManager().getStringsRepository().define(value.getQualifier().sym());
	}

	public matchUnpacked(value: unknown): value is AbstractReference<unknown> {
		return value instanceof AbstractReference && !value.isEmpty();
	}

	public packageId(): number {
		return 1;
	}

}