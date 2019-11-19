import {AbstractPackager} from "../AbstractPackager";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {ReferencePackage} from "../package/ReferencePackage";
import {RegularQualifiedReference} from "../../common/reference/RegularQualifiedReference";
import {RecycledQualifier} from "../../common/qualifier/RecycledQualifier";

import {Packager} from "../context/annotations/Packager";

@Packager
export class ReferencePackager extends AbstractPackager<QualifiedReference<unknown>, ReferencePackage> {


	public unpack(pkg: ReferencePackage): QualifiedReference<unknown> {
		const qualifier = new RecycledQualifier(this.getManager().getStringsRepository().find(pkg.v));

		return new RegularQualifiedReference(qualifier, () => {
			throw new Error("References search is not implemented now");
		});
	}

	public toPackedValue(value: QualifiedReference<unknown>): number {
		return this.getManager().getStringsRepository().define(value.getQualifier().sym());
	}

	public matchUnpacked(value: unknown): value is QualifiedReference<unknown> {
		return value instanceof QualifiedReference && !value.isEmpty();
	}

	public packageId(): number {
		return 1;
	}

}