import {Packager} from "../Packager";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {ReferencePackage} from "../package/ReferencePackage";
import {RegularQualifiedReference} from "../../common/reference/RegularQualifiedReference";
import {RecycledQualifier} from "../../common/qualifier/RecycledQualifier";
import {EmptyQualifiedRefernce} from "../../common/reference/EmptyQualifiedRefernce";
import {EmptyReferencePackage} from "../package/EmptyReferencePackage";

export class EmptyReferencePackager extends Packager<QualifiedReference<unknown>, EmptyReferencePackage> {
	public unpack(): QualifiedReference<unknown> {
		return new EmptyQualifiedRefernce();
	}

	public toPackedValue(value: QualifiedReference<unknown>): number {
		return 0;
	}

	public matchUnpacked(value: unknown): value is QualifiedReference<unknown> {
		return value instanceof QualifiedReference && value.isEmpty();
	}

	public packageId(): number {
		return 8;
	}

}