import {Package} from "./Package";
import {PackagingManager} from "./PackagingManager";
import {Builder} from "../common/utils/Builder";
import {Injectable} from "../dependencies/annotations/Injectable";

@Injectable
export abstract class AbstractPackager<V, P extends Package<number, unknown>> {

	private manager: PackagingManager;

	public setManager(manager: PackagingManager): void {
		this.manager = manager;
	}

	public abstract toPackedValue(value: V): P["v"];

	public abstract packageId(): number;

	public abstract matchUnpacked(value: unknown): value is V;

	public abstract unpack(pkg: P): V;

	public pack(value: V): P {
		return Builder.ofInterface<P>()
			.setAny("t", this.packageId())
			.setAny("v", this.toPackedValue(value))
			.build();
	}

	public matchPackage(pkg: Package<number, unknown>): pkg is P {
		return pkg.t === this.packageId();
	}

	protected getManager() {
		return this.manager;
	}
}