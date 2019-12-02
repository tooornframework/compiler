import {AbstractPackager} from "../AbstractPackager";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {ReferencePackage} from "../package/ReferencePackage";
import {RecycledQualifier} from "../../qualifier/RecycledQualifier";

import {Packager} from "../context/annotations/Packager";
import {Schema} from "common/schema/Schema";

@Packager
export class ReferencePackager extends AbstractPackager<AbstractReference<Schema>, ReferencePackage> {

	public unpack(pkg: ReferencePackage): AbstractReference<Schema> {
		const symbol = this.getManager().getStringsRepository().find(pkg.v);
		const qualifier = new RecycledQualifier(symbol);

		return this.getManager()
			.getRefFactory()
			.from(qualifier, Array.of(Schema));
	}

	public toPackedValue(value: AbstractReference<Schema>): number {
		return this.getManager()
			.getStringsRepository()
			.define(value.getQualifier().sym());
	}

	public matchUnpacked(value: unknown): value is AbstractReference<Schema> {
		return value instanceof AbstractReference && !value.isEmpty();
	}

	public packageId(): number {
		return 1;
	}

}