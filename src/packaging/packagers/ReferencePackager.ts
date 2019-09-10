import {Packager} from "../Packager";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {ReferencePackage} from "../package/ReferencePackage";
import {RegularQualifiedReference} from "../../common/reference/RegularQualifiedReference";
import {RecycledQualifier} from "../../common/qualifier/RecycledQualifier";
import {StringsRegistry} from "../StringsRegistry";

export class ReferencePackager extends Packager<QualifiedReference<unknown>, ReferencePackage> {

	public constructor(private stringRegistry: StringsRegistry) {
		super();
	}

	public unpack(pkg: ReferencePackage): QualifiedReference<unknown> {
		const qualifier = new RecycledQualifier(this.stringRegistry.find(pkg.v));

		return new RegularQualifiedReference(qualifier, () => {
			throw new Error("References search is not implemented now");
		});
	}

	public toPackedValue(value: QualifiedReference<unknown>): number {
		return this.stringRegistry.define(value.getQualifier().sym());
	}

	public matchUnpacked(value: unknown): value is QualifiedReference<unknown> {
		return value instanceof QualifiedReference && !value.isEmpty();
	}

	public packageId(): number {
		return 1;
	}

}