import {ReferenceFactory} from "../common/reference/ReferenceFactory";
import {Class} from "../common/utils/Class";
import {BuildProcessingSyntax} from "./BuildProcessingSyntax";
import {QualifiedReference} from "../common/reference/QualifiedReference";
import {Schema} from "../schema/Schema";

import {Inject} from "../dependencies/annotations/Inject";
import {CollectingComponentsProvider} from "./context/CollectingComponentsProvider";
import {SchemaRepository} from "../repository/SchemaRepository";
import { Once } from "lodash-decorators";

export class BuildManager {

	@Inject
	private collectingComponentsProvider: CollectingComponentsProvider;

	private repository: SchemaRepository;

	private knowQualifiers: Set<string> = new Set();

	public useRepository(repository: SchemaRepository) {
		this.repository = repository;
	}

	public process(): BuildProcessingSyntax<never> {
		return BuildProcessingSyntax.for((classes: Array<Class<any>>, original: any) => {
			const values = this.collectingComponentsProvider.getMappers()
				.reduce((values, mapper) => values
					.flatMap(value => mapper.match(value) ? mapper.intercept(value) : value), [].concat(original));
			const references: Array<QualifiedReference<Schema>> = values.map(value => {
				const builder = this.findOnlyFrom(this.collectingComponentsProvider.getBuilders(), it => it.match(value, this));

				if (!builder) {
					return this.referenceFactory().empty();
				}

				const qualifier = builder.qualifier(value);

				if (this.knowQualifiers.has(qualifier.sym())) {
					return this.referenceFactory().qualified(qualifier, classes.concat(builder.schema()));
				}

				this.knowQualifiers.add(qualifier.sym());

				const scheme = builder.build(qualifier, value, this);

				this.getRepository().set(scheme);


				return this.referenceFactory().qualified(qualifier, classes.concat(builder.schema()));
			});

			const reducer = this.findOnlyFrom(this.collectingComponentsProvider.getReducers(), it => it.match(references));

			if (!reducer) {
				if (references.length == 1) {
					return references[0];
				}
				throw new Error("Unable find the reducer or to many reducers");
			}

			const reducedQualifier = reducer.qualifier(references);

			if (this.knowQualifiers.has(reducedQualifier.sym())) {
				return this.referenceFactory().qualified(reducedQualifier, classes.concat(reducer.schema()));
			}

			this.knowQualifiers.add(reducedQualifier.sym());

			const schema = reducer.reduce(reducedQualifier, references);
			this.getRepository().set(schema);

			return this.referenceFactory().qualified(reducedQualifier, classes.concat(reducer.schema()));
		})
	}

	@Once()
	private referenceFactory() {
		return new ReferenceFactory(q => this.getRepository().get(q));
	}

	private getRepository() {
		return this.repository;
	}

	private findOnlyFrom<T>(candidates: Array<T>, matcher: (x: T) => boolean): T | null {
		const values = candidates
			.filter(it => matcher(it));

		if (values.length > 1) {
			debugger
			throw new Error("More than one was found");
		}

		return values[0];
	}

}