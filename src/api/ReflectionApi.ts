import "./Augmentation";
import {StringsRegistry} from "../packaging/StringsRegistry";
import {PackagingManager} from "../packaging/PackagingManager";
import {ClassSchema} from "../schema/declarations/ClassSchema";
import {EnumMemberSchema} from "../schema/declarations/EnumMemberSchema";
import {EnumSchema} from "../schema/declarations/EnumSchema";
import {FunctionSchema} from "../schema/declarations/FunctionSchema";
import {InterfaceSchema} from "../schema/declarations/InterfaceSchema";
import {InterfacesSetSchema} from "../schema/declarations/InterfacesSetSchema";
import {MethodSchema} from "../schema/declarations/MethodSchema";
import {ParameterSchema} from "../schema/declarations/ParameterSchema";
import {PropertySchema} from "../schema/declarations/PropertySchema";
import {TypeAliasSchema} from "../schema/declarations/TypeAliasSchema";
import {TypeLiteralSchema} from "../schema/declarations/TypeLiteralSchema";
import {TypeParameterSchema} from "../schema/declarations/TypeParameterSchema";
import {DeclaredTypeSchema} from "../schema/type/DeclaredTypeSchema";
import {PlainTypeScheme} from "../schema/type/PlainTypeScheme";
import {SetSchema} from "../schema/type/SetSchema";
import {TypeSchema} from "../schema/type/TypeSchema";
import {StringPackager} from "../packaging/packagers/StringPackager";
import {BooleanPackager} from "../packaging/packagers/BooleanPackager";
import {NonePackager} from "../packaging/packagers/NonePackager";
import {SchemaPackager} from "../packaging/packagers/SchemaPackager";
import {ListPackager} from "../packaging/packagers/ListPackager";
import {ReferencePackager} from "../packaging/packagers/ReferencePackager";
import {QualifierPackager} from "../packaging/packagers/QualifierPackager";
import {EmptyReferencePackager} from "../packaging/packagers/EmptyReferencePackager";

class ReflectionApi {
	private definitions: Array<any> = [];
	private strings: StringsRegistry;

	private map: Map<any, any> = new Map<any, any>();

	public definition(def: any) {
		this.definitions = this.definitions.concat(def);
	}

	public reference(ref: any, qual: any) {
		this.map.set(qual, ref);
	}

	public defineNameRegistry(nr: any): this {
		this.strings = StringsRegistry.formJson(nr);
		return this;
	}

	public get(ref: any): any {
		return this.definitions
			.map(it => this.getPackager().unpack(it));
	}

	private getPackager() {
		const nameToSchema = new Map([
			[ClassSchema.name, ClassSchema],
			[EnumMemberSchema.name, EnumMemberSchema],
			[EnumSchema.name, EnumSchema],
			[FunctionSchema.name, FunctionSchema],
			[InterfaceSchema.name, InterfaceSchema],
			[InterfacesSetSchema.name, InterfacesSetSchema],
			[MethodSchema.name, MethodSchema],
			[ParameterSchema.name, ParameterSchema],
			[PropertySchema.name, PropertySchema],
			[TypeAliasSchema.name, TypeAliasSchema],
			[TypeLiteralSchema.name, TypeLiteralSchema],
			[TypeParameterSchema.name, TypeParameterSchema],
			[DeclaredTypeSchema.name, DeclaredTypeSchema],
			[PlainTypeScheme.name, PlainTypeScheme],
			[SetSchema.name, SetSchema],
			[TypeSchema.name, TypeSchema],
		]);

		return PackagingManager.configure(it =>
			it.packager(new StringPackager())
				.packager(new BooleanPackager())
				.packager(new NonePackager())
				.packager(new SchemaPackager(this.strings, nameToSchema))
				.packager(new ListPackager())
				.packager(new ReferencePackager(this.strings))
				.packager(new QualifierPackager(this.strings))
				.packager(new EmptyReferencePackager()));

	}
}

window.R = new ReflectionApi();