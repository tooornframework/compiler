import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import { Node } from "ts-morph";
import {UniqQualifierRecognizer} from "common/qualifier/recognizer/SimpleQualifierRecognizer";
import {AbstractQualifierRecognizer} from "common/qualifier/recognizer/AbstractQualifierRecognizer";
import {UniqSimpleSchemaRepository} from "common/repository/schema/FileSeparatedSchemaRepository";
import {ProcessingManager} from "collector/processing/ProcessingManager";
import {Schema} from "common/schema/Schema";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {AbstractReferenceFactory} from "common/misc/reference/factory/AbstractReferenceFactory";
import {SchemaRepositoryReferenceFactory} from "common/misc/reference/factory/SchemaRepositoryReferenceFactory";
import {AbstractExpansionResolver} from "collector/processing/expansion/AbstractExpansionResolver";
import {AbsoluteExpansionResolver} from "collector/processing/expansion/AbsoluteExpansionResolver";

export abstract class AbstractEntryPoint {

    private usedSchemaRepository: AbstractSchemaRepository = this.schemaRepository();

    private usedExpansionResolver: AbstractExpansionResolver = this.expansionResolver();

    private usedQualifierRecognizer: AbstractQualifierRecognizer = this.qualifierRecognizer();

    private usedReferenceFactory: AbstractReferenceFactory = this.referenceFactory(this.usedSchemaRepository);

    private manager!: ProcessingManager;

    public run(): Array<AbstractReference<Schema>> {
        if (!this.manager) {
            this.manager = ProcessingManager.configuration(config => config
                .recognizer(this.usedQualifierRecognizer)
                .repository(this.usedSchemaRepository)
                .expansionResolver(this.usedExpansionResolver)
                .factory(this.usedReferenceFactory))
        }

        return this.manager.process()
            .as(Schema)
            .all(this.entryNodes());
    }

    public getRepository(): AbstractSchemaRepository {
        return this.usedSchemaRepository;
    }

    public getReferenceFactory(): AbstractReferenceFactory {
        return this.usedReferenceFactory;
    }

    protected abstract entryNodes(): Array<Node>;

    protected schemaRepository(): AbstractSchemaRepository {
        return new UniqSimpleSchemaRepository();
    }

    protected qualifierRecognizer(): AbstractQualifierRecognizer {
        return new UniqQualifierRecognizer();
    }

    protected referenceFactory(usedSchemaRepository: AbstractSchemaRepository): AbstractReferenceFactory {
        return new SchemaRepositoryReferenceFactory(usedSchemaRepository);
    }

    protected expansionResolver(): AbstractExpansionResolver {
        return new AbsoluteExpansionResolver();
    }

}