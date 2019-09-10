import {Project, Node} from "ts-morph";
import {BuildManager} from "../collecting/BuildManager";
import {Repository} from "../collecting/support/Repository";
import {ClassBuilder} from "../collecting/builders/ClassBuilder";
import {Runner} from "../collecting/support/Runner";
import {InterfaceBuilder} from "../collecting/builders/InterfaceBuilder";
import {PropertyBuilder} from "../collecting/builders/PropertyBuilder";
import {VariableToDeclarationsInterceptor} from "../collecting/interseptors/VariableToDeclarationsInterceptor";
import {ManyWithIterfacesToSetReducer} from "../collecting/reducers/ManyWithIterfacesToSetReducer";
import {PlainTypeBuilder} from "../collecting/builders/PlainTypeBuilder";
import {DeclaredTypeBuilder} from "../collecting/builders/DeclaredTypeBuilder";
import {MethodBuilder} from "../collecting/builders/MethodBuilder";
import {ParameterBuilder} from "../collecting/builders/ParameterBuilder";
import {TypeAliasBuilder} from "../collecting/builders/TypeAliasBuilder";
import {TypeLiteralBuilder} from "../collecting/builders/TypeLiteralBuilder";
import {SetSchemeBuilder} from "../collecting/builders/SetSchemeBuilder";
import {TypeParameterBuilder} from "../collecting/builders/TypeParameterBuilder";
import {TypeParameterReducer} from "../collecting/reducers/TypeParameterReducer";
import {StringsRegistry} from "../packaging/StringsRegistry";

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
import {PackagingManager} from "../packaging/PackagingManager";
import {StringPackager} from "../packaging/packagers/StringPackager";
import {BooleanPackager} from "../packaging/packagers/BooleanPackager";
import {NonePackager} from "../packaging/packagers/NonePackager";
import {SchemaPackager} from "../packaging/packagers/SchemaPackager";
import {ListPackager} from "../packaging/packagers/ListPackager";
import {ReferencePackager} from "../packaging/packagers/ReferencePackager";
import {QualifierPackager} from "../packaging/packagers/QualifierPackager";
import {EmptyReferencePackager} from "../packaging/packagers/EmptyReferencePackager";
import {WritingManager} from "../writer/WritingManager";
import {ReflectionBridge} from "../writer/bridge/ReflectionBridge";
import {Schema} from "../schema/Schema";
import {InterfaceToInterfacesInterceptor} from "../collecting/interseptors/InterfaceToInterfacesInterceptor";

export class Plugin {

	public spawn() {
		const project = new Project({
			tsConfigFilePath: "./tsconfig.json"
		});

		const repository = new Repository();

		const buildManager = BuildManager.configure(conf => conf
			.builder(new ClassBuilder())
			.builder(new InterfaceBuilder())
			.builder(new PropertyBuilder())
			.builder(new PlainTypeBuilder())
			.builder(new DeclaredTypeBuilder())
			.builder(new MethodBuilder())
			.builder(new ParameterBuilder())
			.builder(new TypeAliasBuilder())
			.builder(new TypeLiteralBuilder())
			.builder(new TypeParameterBuilder())
			.builder(new SetSchemeBuilder())
			.reducer(new ManyWithIterfacesToSetReducer())
			.reducer(new TypeParameterReducer())
			.interceptor(new VariableToDeclarationsInterceptor())
			.interceptor(new InterfaceToInterfacesInterceptor())
			.repository(repository)
		);

		const runner = new Runner(project, buildManager);

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

		const stringsRegistry = StringsRegistry.empty();

		const packagingManager = PackagingManager.configure(it =>
			it.packager(new StringPackager())
				.packager(new BooleanPackager())
				.packager(new NonePackager())
				.packager(new SchemaPackager(stringsRegistry, nameToSchema))
				.packager(new ListPackager())
				.packager(new ReferencePackager(stringsRegistry))
				.packager(new QualifierPackager(stringsRegistry))
				.packager(new EmptyReferencePackager()));


		const definedValues = new Set();

		return function(conf: any) {
			const bride = new ReflectionBridge();
			const sf = project.getSourceFile(conf.resource);
			const writer = new WritingManager(sf, bride);

			const onInFileSchemaAdd = (schema: Schema, node: Node) => {
				writer.writeReference(node, schema.qualifier);
			};

			runner.start(conf.resource, onInFileSchemaAdd);

			const schemasToWrite = repository.values()
				.filter(it => !definedValues.has(it.qualifier.sym()));

			schemasToWrite
				.forEach(it => definedValues.add(it.qualifier.sym()));

			const packages = schemasToWrite.map(it => packagingManager.pack(it));
			writer.writeDefinition(packages);

			return sf.print();
		}
	}
}