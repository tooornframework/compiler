import {Json} from "../misc/utils/Json";
import {mapToObj, notNullOrThrow, toJson} from "../misc/utils/LangUtils";

export class StringsRepository {

	public static empty(): StringsRepository {
		return new StringsRepository(new Map());
	}

	public static formJson(json: Json): StringsRepository {

		if (typeof json !== "object") {
			throw new Error("json is bad");
		}

		const idToName = new Map<number, string>();

		Object.entries(json).forEach(([name, id]) => {
			if (typeof name !== "string" || typeof id !== "number") {
				throw new Error("Format is bad");
			}
			idToName.set(id, name);
		});

		return new StringsRepository(idToName);
	}

	private lastId = 1;

	private readonly nameToId = new Map<string, number>();

	private constructor(private readonly idToName: Map<number, string>) {
		idToName.forEach((name, id) => this.nameToId.set(name, id));
		this.lastId = Array.from(idToName.keys())
			.reduce((acc, it) => acc > it ? acc : it, 0);
	}

	public define(name: string): number {
		if (this.nameToId.has(name)) {
			return this.nameToId.get(name);
		}

		this.nameToId.set(name, this.lastId);
		this.idToName.set(this.lastId, name);
		return this.lastId++;
	}

	public find(id: number): string {
		return notNullOrThrow(this.idToName.get(id), "Not found");
	}

	public toJson(): Json {
		return toJson(mapToObj(this.nameToId));
	}
}