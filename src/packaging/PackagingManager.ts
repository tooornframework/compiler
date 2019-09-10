import {Package} from "./Package";
import {PackagingManagerConfigurator} from "./conf/PackagingManagerConfigurator";

export class PackagingManager {

	public static configure(configurationAction: (x: PackagingManagerConfigurator) => void): PackagingManager {
		const configurator = new PackagingManagerConfigurator();
		configurationAction(configurator);
		return new PackagingManager(configurator);
	}

	private constructor(private conf: PackagingManagerConfigurator) {
		const ids = [];

		this.conf.getPackagers().forEach(it => {
			if (ids.includes(it.packageId())) {
				throw new Error("Duplicated id");
			}

			ids.push(it.packageId());
			return it.setManager(this);
		});
	}

	public pack(value: unknown): Package<number, unknown> {
		const pkgers = this.conf.getPackagers().filter(it => it.matchUnpacked(value));
		if (!pkgers.length) {
			throw new Error("Unable to find packager");
		}
		if (pkgers.length === 0) {
			throw new Error("Found more than one packager for schema");
		}

		return pkgers[0].pack(value);
	}

	public unpack(pkg: Package<number, unknown>): unknown {
		const pkgers = this.conf.getPackagers().filter(it => it.matchPackage(pkg));
		if (!pkgers.length) {
			throw new Error("Unable to find packager");
		}
		if (pkgers.length === 0) {
			throw new Error("Found more than one packager for schema");
		}

		return pkgers[0].unpack(pkg);
	}

}