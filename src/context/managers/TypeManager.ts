import {Type} from "ts-morph";
import {BaseTypeScheme} from "../../schemas/type/BaseTypeScheme";
import {UnionOrIntersectionScheme} from "../../schemas/type/UnionOrIntersectionScheme";
import {TurpleScheme} from "../../schemas/type/TurpleScheme";
import {PlainTypeScheme} from "../../schemas/type/PlainTypeScheme";
import {DeclaredTypeScheme} from "../../schemas/type/DeclaredTypeScheme";
import {CompilerContext} from "../CompilerContext";
import {Class} from "../../common/utils/Class";
import {isTypeDeclarable, isTypePlain} from "../TypeUtils";

export class TypeManager {


	private cache = new Map<string, BaseTypeScheme>();

	public constructor(private readonly manager: CompilerContext) {

	}

	public getScheme<T extends BaseTypeScheme = BaseTypeScheme>(type: Type, Clazz?: Class<T>): T {
		// hack
		// @ts-ignore
		const id = type.compilerType.id.toString();

		if (this.cache.has(id)) {
			const scheme = this.cache.get(id);

			if (Clazz && !(scheme instanceof Clazz)){
				throw new Error("Wrong casting");
			}

			return scheme as T;
		}

		const scheme = this.selectTypeScheme(type);

		if (Clazz && !(scheme instanceof Clazz)){
			throw new Error("Wrong casting");
		}

		this.cache.set(id, scheme);

		return scheme as T;
	}

	private selectTypeScheme(type: Type): BaseTypeScheme {

		if (type.isUnionOrIntersection()) {
			return new UnionOrIntersectionScheme(type, this.manager);
		}

		if (type.isTuple()) {
			return new TurpleScheme(type, this.manager);
		}

		if (isTypePlain(type)) {
			return new PlainTypeScheme(type, this.manager);
		}

		if (isTypeDeclarable(type)) {
			return new DeclaredTypeScheme(type, this.manager);
		}

		throw new Error("Unknown type scheme");
	}




}