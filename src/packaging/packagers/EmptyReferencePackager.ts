import {AbstractPackager} from "../AbstractPackager";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {EmptyQualifiedRefernce} from "../../common/reference/EmptyQualifiedRefernce";
import {EmptyReferencePackage} from "../package/EmptyReferencePackage";
import {Packager} from "../context/annotations/Packager";

@Packager
export class EmptyReferencePackager extends AbstractPackager<QualifiedReference<unknown>, EmptyReferencePackage> {
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