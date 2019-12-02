import {AbstractReferenceFactory} from "common/misc/reference/factory/AbstractReferenceFactory";
import {Class} from "common/misc/utils/Class";
import {ProcessingSyntax} from "./ProcessingSyntax";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {Schema} from "common/schema/Schema";

import {Inject} from "common/dependencies/annotations/Inject";
import {CollectingComponentsProvider} from "./context/CollectingComponentsProvider";
import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import {AbstractQualifierRecognizer} from "common/qualifier/recognizer/AbstractQualifierRecognizer";
import {ProcessingManagerConfiguration} from "collector/processing/configuration/ProcessingManagerConfiguration";
import {ProcessingManagerConfigurationExtractor} from "collector/processing/configuration/ProcessingManagerConfigurationExtractor";
import {SchemeReducer} from "collector/processing/SchemeReducer";
import {AbstractExpansionResolver} from "collector/processing/expansion/AbstractExpansionResolver";

export class ProcessingManager {

	public static configuration(action: (config: ProcessingManagerConfiguration) => void): ProcessingManager {
		const conf = new ProcessingManagerConfigurationExtractor();
		action(conf);
		return new ProcessingManager(conf)
	}

	@Inject
	private collectingComponentsProvider: CollectingComponentsProvider;

	private repository: AbstractSchemaRepository;

	private qualifierRecognizer: AbstractQualifierRecognizer;

	private referenceFactory: AbstractReferenceFactory;

	private expansionResolver: AbstractExpansionResolver;

	private constructor(config: ProcessingManagerConfigurationExtractor) {
		this.repository = config.getRepository();
		this.qualifierRecognizer = config.getRecognizer();
		this.referenceFactory = config.getReferenceFactory();
		this.expansionResolver = config.getExpansionResolver();
	}

	public process(): ProcessingSyntax<never> {
		return ProcessingSyntax.for((classes: Array<Class<Schema>>, original: any) => {
			const values = this.performMapping(original);

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
			return this.referenceFactory.from(reducedQualifier, classes.concat(reducer.schema()));
		}

		this.qualifierRecognizer.discover(reducedQualifier);

		const schema = reducer.reduce(reducedQualifier, references);
		this.repository.set(schema);

		return this.referenceFactory.from(reducedQualifier, classes.concat(reducer.schema()));
	}

	private performMapping(original: unknown) {
		return this.collectingComponentsProvider.getMappers()
			.reduce((values, mapper) => values
				.map(value => mapper.match(value) ? mapper.map(value) : value)
				.reduce<Array<unknown>>((acc, it) => acc.concat(it), []), [].concat(original));
	}

	private findReferences(values: Array<unknown>, classes: Array<Class<Schema>>) {
		return values.map(value => {
			const builder = this.findOnlyFrom(this.collectingComponentsProvider.getBuilders(), it => it.match(value, this));

			if (!builder) {
				return this.referenceFactory.empty();
			}

			const qualifier = builder.qualifier(value);


			if (this.qualifierRecognizer.isDiscovered(qualifier)) {
				return this.referenceFactory.from(qualifier, classes);
			}

			this.qualifierRecognizer.discover(qualifier);

			const scheme = builder.build(qualifier, value, this);

			this.repository.set(scheme);

			return this.referenceFactory.from(qualifier, classes);
		});
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