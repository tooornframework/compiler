import {Package} from "./Package";
import {Inject} from "../dependencies/annotations/Inject";
import {PackagersProvider} from "./context/PackagersProvider";
import {StringsRepository} from "../repository/StringsRepository";

export class PackagingManager {

	@Inject
	private packagersProvider: PackagersProvider;

	public constructor(private stringsRepository: StringsRepository) {
		const ids = [];

		this.packagersProvider.getAll().forEach(it => {
			if (ids.includes(it.packageId())) {
				throw new Error("Duplicated id");
			}

			ids.push(it.packageId());
			return it.setManager(this);
		});
	}

	public getStringsRepository() {
		return this.stringsRepository;
	}

	public useStringsRepository(stringsRepository: StringsRepository) {
		this.stringsRepository = stringsRepository;
	}

	public pack(value: unknown): Package<number, unknown> {
		const pkgers = this.packagersProvider.getAll()
			.filter(it => it.matchUnpacked(value));

		if (!pkgers.length) {
			throw new Error("Unable to find packager");
		}

		if (pkgers.length > 1) {
			throw new Error("Found more than one packager for schema");
		}

		return pkgers[0].pack(value);
	}

	public unpack(pkg: Package<number, unknown>): unknown {
		const pkgers = this.packagersProvider.getAll()
			.filter(it => it.matchPackage(pkg));

		if (!pkgers.length) {
			throw new Error("Unable to find packager");
		}
		if (pkgers.length > 1) {
			throw new Error("Found more than one packager for schema");
		}

		return pkgers[0].unpack(pkg);
	}

}