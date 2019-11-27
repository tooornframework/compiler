import {ProcessingManagerConfiguration} from "collector/processing/configuration/ProcessingManagerConfiguration";
import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import {AbstractQualifierRecognizer} from "common/qualifier/recognizer/AbstractQualifierRecognizer";
import {ReferenceFactory} from "common/misc/reference/factory/ReferenceFactory";

export class ProcessingManagerConfigurationExtractor extends ProcessingManagerConfiguration {

    public getRepository(): AbstractSchemaRepository {
        return this._repository;
    }

    public getRecognizer(): AbstractQualifierRecognizer {
        return this._recognizer;
    }

    public getFactory(): ReferenceFactory {
        return this._factory;
    }

}