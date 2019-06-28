import {BuildManagerConfigurator} from "./BuildManagerConfigurator";

export class InternalBuildManagerConfigurator extends BuildManagerConfigurator {
	public getBuilders() {
		return this.builders;
	}

	public getInterceptors() {
		return this.interceptors;
	}

	public getReducers() {
		return this.reducers;
	}

	public getRepository() {
		return this.repo;
	}
}