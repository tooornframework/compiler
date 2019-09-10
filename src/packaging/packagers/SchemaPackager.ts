import {Packager} from "../Packager";
import {Schema} from "../../schema/Schema";
import {SchemaPackage} from "../package/SchemaPackage";
import {Package} from "../Package";
import {StringsRegistry} from "../StringsRegistry";
import {NoArgsConstructorClass} from "../../common/utils/Class";
import {mapToObj, notNullOrThrow} from "../../common/utils/LangUtils";
import {Builder} from "../../common/utils/Builder";
import {Hash} from "../../common/utils/MappedType";

export class SchemaPackager extends Packager<Schema, SchemaPackage>{

	constructor(protected stringRegistry: StringsRegistry, protected schemas: Map<string, NoArgsConstructorClass<Schema>>) {
		super();
	}

	public unpack(pkg: SchemaPackage): Schema {
		const name = this.schemas.get(this.stringRegistry.find(pkg.n));
		const SchemaClass = notNullOrThrow(name, "Not found");

		const builder = Builder.of(SchemaClass);

		Object.entries(pkg.v).forEach(([key, value]) => {
			const unpacked = this.manager.unpack(value);
			const num = Number.parseInt(key);

			if (Number.isNaN(num)) {
				throw new Error("Cannot convert");
			}

			const propertyName = this.stringRegistry.find(num);
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
			n: this.stringRegistry.define(value.constructor.name),
		});
	}

	public toPackedValue(value: Schema): Hash<Package<number, unknown>> {
		const packages = new Map<string, Package<number, unknown>>();

		Object.entries(value).forEach(([key, value]) => {
			packages.set(this.stringRegistry.define(key).toString(), this.manager.pack(value));
		});

		return mapToObj(packages);
	}
}