import {SchemaBuilder} from "../SchemaBuilder";
import {Schema} from "../../schema/Schema";
import {SchemeReducer} from "../SchemeReducer";
import {Interceptor} from "../Interceptor";
import {Repository} from "../support/Repository";

export class BuildManagerConfigurator {

	public constructor() {

	}

	protected builders: Array<SchemaBuilder<unknown, Schema>> = [];
	protected reducers: Array<SchemeReducer<Schema, Schema>> = [];
	protected interceptors: Array<Interceptor<unknown, unknown>> = [];
	protected repo: Repository;

	public interceptor(interceptor: Interceptor<unknown, unknown>) {
		this.interceptors.push(interceptor);
		return this;
	}

	public builder(builder: SchemaBuilder<unknown, Schema>) {
		this.builders.push(builder);
		return this;
	}

	public reducer(reducer: SchemeReducer<Schema, Schema>) {
		this.reducers.push(reducer);
		return this;
	}

	public repository(repository: Repository) {
		this.repo = repository;
		return this;
	}

}