import {AbstractReferenceFactory} from "common/misc/reference/factory/AbstractReferenceFactory";
import {AbstractQualifierRecognizer} from "common/qualifier/recognizer/AbstractQualifierRecognizer";
import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import {AbstractExpansionResolver} from "collector/processing/expansion/AbstractExpansionResolver";

export class ProcessingManagerConfiguration {
    protected _repository: AbstractSchemaRepository;
    protected _recognizer: AbstractQualifierRecognizer;
    protected _factory: AbstractReferenceFactory;
    protected _expansionResolver: AbstractExpansionResolver;

    public repository(repository: AbstractSchemaRepository) {
        this._repository = repository;
        return this;
    }

    public recognizer(recognizer: AbstractQualifierRecognizer) {
        this._recognizer = recognizer;
        return this;
    }

    public factory(factory: AbstractReferenceFactory) {
        this._factory = factory;
        return this;
    }

    public expansionResolver(expansionResolver: AbstractExpansionResolver) {
        this._expansionResolver = expansionResolver;
        return this;
    }
}