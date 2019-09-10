import {Packager} from "../Packager";
import {Package} from "../Package";

export class PackagingManagerConfigurator {
	protected packagers: Array<Packager<unknown, Package<number, unknown>>> = [];

	public packager(packager: Packager<unknown, Package<number, unknown>>) {
		this.packagers.push(packager);
		return this;
	}

	public getPackagers() {
		return this.packagers;
	}
}