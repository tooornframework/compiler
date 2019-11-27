import {ReferenceFactory} from "common/misc/reference/factory/ReferenceFactory";
import {AbstractQualifierRecognizer} from "common/qualifier/recognizer/AbstractQualifierRecognizer";
import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";

export class ProcessingManagerConfiguration {
    protected _repository: AbstractSchemaRepository;
    protected _recognizer: AbstractQualifierRecognizer;
    protected _factory: ReferenceFactory;

    public repository(repository: AbstractSchemaRepository) {
        this._repository = repository;
        return this;
    }

    public recognizer(recognizer: AbstractQualifierRecognizer) {
        this._recognizer = recognizer;
        return this;
    }

    public factory(factory: ReferenceFactory) {
        this._factory = factory;
        return this;
    }
}