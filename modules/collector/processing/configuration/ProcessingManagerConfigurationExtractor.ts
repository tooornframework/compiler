import {ProcessingManagerConfiguration} from "collector/processing/configuration/ProcessingManagerConfiguration";
import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import {AbstractQualifierRecognizer} from "common/qualifier/recognizer/AbstractQualifierRecognizer";
import {AbstractReferenceFactory} from "common/misc/reference/factory/AbstractReferenceFactory";
import {AbstractExpansionResolver} from "collector/processing/expansion/AbstractExpansionResolver";

export class ProcessingManagerConfigurationExtractor extends ProcessingManagerConfiguration {

    public getRepository(): AbstractSchemaRepository {
        return this._repository;
    }

    public getRecognizer(): AbstractQualifierRecognizer {
        return this._recognizer;
    }

    public getReferenceFactory(): AbstractReferenceFactory {
        return this._factory;
    }

    public getExpansionResolver(): AbstractExpansionResolver {
        return this._expansionResolver;
    }
}