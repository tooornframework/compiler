import {QualifiedReference} from "../common/reference/QualifiedReference";
import {v4} from "uuid";
import {ReferenceFactory} from "../common/reference/ReferenceFactory";
import {Class} from "../common/utils/Class";
import {BuildProcessingSyntax} from "./BuildProcessingSyntax";
import {BuildManagerConfigurator} from "./conf/BuildManagerConfigurator";
import {InternalBuildManagerConfigurator} from "./conf/InternalBuildManagerConfigurator";

export class BuildManager {

	public static configure(configurationAction: (x: BuildManagerConfigurator) => void): BuildManager {
		const configurator = new InternalBuildManagerConfigurator();
		configurationAction(configurator);
		return new BuildManager(configurator);
	}

	private knowQualifiers: Set<string> = new Set();
	private referenceFactory: ReferenceFactory;

	private constructor(private configurator: InternalBuildManagerConfigurator) {
		this.referenceFactory = new ReferenceFactory(q => this.configurator.getRepository().get(q));
	}

	public process(): BuildProcessingSyntax<never> {
		return BuildProcessingSyntax.of((classes: Array<Class<any>>, original: any) => {
			this.log("Processing as instances of (" + classes.map(it => it.name).join(", ") + ") ");
			this.log("Values before interceptors, list=" + Array.isArray(original) + " ( " + [].concat(original).map(it => it ? it.constructor.name : it).join(", ") + ")");

			const values = this.configurator.getInterceptors()
				.reduce((values, interceptor) => values
					.flatMap(value => interceptor.match(value) ? interceptor.intercept(value) : value), [].concat(original));

			this.log("Values after interceptors, ( " + values.map(it => it ? it.constructor.name : it).join(", ") + ")");

			const references = values.map(value => {
				const builder = this.findOnlyFrom(this.configurator.getBuilders(), it => it.match(value, this));

				this.log("Processing value (" + (value ? value.constructor.name : value) + ")");
				this.log("Builder=" + (builder ? builder.constructor.name : builder));

				if (!builder) {
					return this.referenceFactory.empty();
				}

				const qualifier = builder.qualifier(value);

				this.log("Qualifier is " + qualifier.sym());
				if (this.knowQualifiers.has(qualifier.sym())) {
					this.log("Qualifier exists, skip building");
					return this.referenceFactory.qualified(qualifier, classes.concat(builder.schema()));
				}

				const id = v4();

				this.log("Building scheme " + id);
				this.knowQualifiers.add(qualifier.sym());

				const scheme = builder.build(qualifier, value, this);

				this.configurator.getRepository().set(scheme);

				this.log("Finished scheme " + id + " of type " + scheme.constructor.name);


				return this.referenceFactory.qualified(qualifier, classes.concat(builder.schema()));
			});

			const reducer = this.findOnlyFrom(this.configurator.getReducers(), it => it.match(references));

			if (!reducer) {
				if (references.length == 1) {
					this.log("returning reference, no reducing");
					return references[0];
				}

				throw new Error("Unable find the reducer");
			}
			this.log("Found reducer " + reducer.constructor.name);

			const reducedQualifier = reducer.qualifier(references);

			this.log("Qualifier for reducer " + reducedQualifier.sym());

			if (this.knowQualifiers.has(reducedQualifier.sym())) {
				this.log("Qualifier exists, skip building");
				return this.referenceFactory.qualified(reducedQualifier, classes.concat(reducer.schema()));
			}

			const id = v4();

			this.knowQualifiers.add(reducedQualifier.sym());
			this.log("Executing reducer" + id);
			const schema = reducer.reduce(reducedQualifier, values);
			this.configurator.getRepository().set(schema);
			this.log("Reducer execution finished" + id + ", of type (" + schema.constructor.name + ")");
			return this.referenceFactory.qualified(reducedQualifier, classes.concat(reducer.schema()));
		})
	}

	private log(...messages: Array<any>) {
		return;
		console.log(...messages);
	}

	private findOnlyFrom<T>(candidates: Array<T>, matcher: (x: T) => boolean): T | null {
		const values = candidates
			.filter(it => matcher(it));

		if (values.length > 1) {
			throw new Error("More than one was found");
		}

		return values[0];
	}


}
