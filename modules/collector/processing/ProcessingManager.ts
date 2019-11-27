import {ReferenceFactory} from "common/misc/reference/factory/ReferenceFactory";
import {Class} from "common/misc/utils/Class";
import {ProcessingSyntax} from "./ProcessingSyntax";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {Schema} from "common/schema/Schema";

import {Inject} from "common/dependencies/annotations/Inject";
import {CollectingComponentsProvider} from "./context/CollectingComponentsProvider";
import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import { Once } from "lodash-decorators";
import {AbstractQualifierRecognizer} from "common/qualifier/recognizer/AbstractQualifierRecognizer";
import {ProcessingManagerConfiguration} from "collector/processing/configuration/ProcessingManagerConfiguration";
import {ProcessingManagerConfigurationExtractor} from "collector/processing/configuration/ProcessingManagerConfigurationExtractor";
import {SchemeReducer} from "collector/processing/SchemeReducer";

export class ProcessingManager {

	public static configuration(): ProcessingManagerConfiguration {
		return new ProcessingManagerConfigurationExtractor();
	}

	@Inject
	private collectingComponentsProvider: CollectingComponentsProvider;

	private repository: AbstractSchemaRepository;

	private qualifierRecognizer: AbstractQualifierRecognizer;

	public constructor(config: ProcessingManagerConfiguration) {
		if (!(config instanceof ProcessingManagerConfigurationExtractor)) {
			throw new Error("User ProcessingManager.configuration() to create a configuration object");
		}
	}

	public process(): ProcessingSyntax<never> {
		return ProcessingSyntax.for((classes: Array<Class<any>>, original: any) => {
			const values = this.performMap(original);

			const references: Array<AbstractReference<Schema>> = this.findReferences(values, classes);

			const reducer = this.findOnlyFrom(this.collectingComponentsProvider.getReducers(), it => it.match(references));

			if (!reducer) {
				if (!this.isReducingNeeded(references)) {
					return references[0];
				}
				throw new Error("Reducing is needed, found " + references.length + " schemas for one request");
			}

			return this.performReducing(reducer, references, classes);
		})
	}

	private isReducingNeeded(references: Array<AbstractReference<Schema>>) {
		return references.length != 1;
	}

	private performReducing(reducer: SchemeReducer<Schema, Schema>, references: Array<AbstractReference<Schema>>, classes: Array<Class<any>>) {
		const reducedQualifier = reducer.qualifier(references);

		if (this.qualifierRecognizer.isDiscovered(reducedQualifier)) {
			return this.referenceFactory().from(reducedQualifier, classes.concat(reducer.schema()));
		}

		this.qualifierRecognizer.discover(reducedQualifier);

		const schema = reducer.reduce(reducedQualifier, references);
		this.repository.set(schema);

		return this.referenceFactory().from(reducedQualifier, classes.concat(reducer.schema()));
	}

	private performMap(original: unknown) {
		return this.collectingComponentsProvider.getMappers()
			.reduce((values, mapper) => values
				.map(value => mapper.match(value) ? mapper.map(value) : value)
				.reduce<Array<unknown>>((acc, it) => acc.concat(it), []), [].concat(original));
	}

	private findReferences(values: Array<unknown>, classes: Array<Class<any>>) {
		return values.map(value => {
			const builder = this.findOnlyFrom(this.collectingComponentsProvider.getBuilders(), it => it.match(value, this));

			if (!builder) {
				return this.referenceFactory().empty();
			}

			const qualifier = builder.qualifier(value);

			if (this.qualifierRecognizer.isDiscovered(qualifier)) {
				return this.referenceFactory().from(qualifier, classes.concat(builder.schema()));
			}

			this.qualifierRecognizer.discover(qualifier);

			const scheme = builder.build(qualifier, value, this);

			this.repository.set(scheme);

			return this.referenceFactory().from(qualifier, classes.concat(builder.schema()));
		});
	}

	@Once()
	private referenceFactory() {
		return new ReferenceFactory(q => this.repository.get(q));
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