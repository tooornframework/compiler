import {AbstractPackager} from "../AbstractPackager";
import {RecycledQualifier} from "../../qualifier/RecycledQualifier";
import {Qualifier} from "../../qualifier/Qualifier";
import {QualifierPackage} from "../package/QualifierPackage";
import {StringsRepository} from "../../repository/StringsRepository";
import {Inject} from "../../dependencies/annotations/Inject";
import {Packager} from "../context/annotations/Packager";

@Packager
export class QualifierPackager extends AbstractPackager<Qualifier, QualifierPackage> {
	public unpack(pkg: QualifierPackage): Qualifier {
		return new RecycledQualifier(this.getManager().getStringsRepository().find(pkg.v));
	}

	public toPackedValue(value: Qualifier): number {
		return this.getManager().getStringsRepository().define(value.sym());
	}

	public matchUnpacked(value: unknown): value is Qualifier {
		return value instanceof Qualifier;
	}

	public packageId(): number {
		return 7;
	}

}