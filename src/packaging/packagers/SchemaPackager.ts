import {AbstractPackager} from "../AbstractPackager";
import {Schema} from "../../schema/Schema";
import {SchemaPackage} from "../package/SchemaPackage";
import {Package} from "../Package";
import {mapToObj, notNullOrThrow} from "../../common/utils/LangUtils";
import {Builder} from "../../common/utils/Builder";
import {Hash} from "../../common/utils/MappedType";
import {Inject} from "../../dependencies/annotations/Inject";
import {Packager} from "../context/annotations/Packager";
import {SchemaRegistry} from "../../schema/context/SchemaRegistry";

@Packager
export class SchemaPackager extends AbstractPackager<Schema, SchemaPackage>{
	@Inject
	private schemaRegistry: SchemaRegistry;

	public unpack(pkg: SchemaPackage): Schema {
		const name = this.schemaRegistry.get(this.getManager().getStringsRepository().find(pkg.n));
		const SchemaClass = notNullOrThrow(name, "Not found");

		const builder = Builder.of(SchemaClass);

		Object.entries(pkg.v).forEach(([key, value]) => {
			const unpacked = this.getManager().unpack(value);
			const num = Number.parseInt(key);

			if (Number.isNaN(num)) {
				throw new Error("Cannot convert");
			}

			const propertyName = this.getManager().getStringsRepository().find(num);
			builder.setAny(propertyName, unpacked);
		});

		return builder.build();
	}

	public matchUnpacked(value: unknown): value is Schema {
		return value instanceof Schema;
	}

	public packageId(): 6 {
		return 6;
	}

	public pack(value: Schema): SchemaPackage {
		return Builder.ofInterface<SchemaPackage>().setAndBuild({
			t: this.packageId(),
			v: this.toPackedValue(value),
			n: this.getManager().getStringsRepository().define(value.constructor.name),
		});
	}

	public toPackedValue(value: Schema): Hash<Package<number, unknown>> {
		const packages = new Map<string, Package<number, unknown>>();

		Object.entries(value).forEach(([key, value]) => {
			packages.set(this.getManager().getStringsRepository().define(key).toString(), this.getManager().pack(value));
		});

		return mapToObj(packages);
	}
}