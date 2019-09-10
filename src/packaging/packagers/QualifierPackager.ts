import {Packager} from "../Packager";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {ReferencePackage} from "../package/ReferencePackage";
import {RegularQualifiedReference} from "../../common/reference/RegularQualifiedReference";
import {RecycledQualifier} from "../../common/qualifier/RecycledQualifier";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {QualifierPackage} from "../package/QualifierPackage";
import {StringsRegistry} from "../StringsRegistry";

export class QualifierPackager extends Packager<Qualifier, QualifierPackage> {

	public constructor(private stringRegistry: StringsRegistry) {
		super();
	}

	public unpack(pkg: QualifierPackage): Qualifier {
		return new RecycledQualifier(this.stringRegistry.find(pkg.v));
	}

	public toPackedValue(value: Qualifier): number {
		return this.stringRegistry.define(value.sym());
	}

	public matchUnpacked(value: unknown): value is Qualifier {
		return value instanceof Qualifier;
	}

	public packageId(): number {
		return 7;
	}

}