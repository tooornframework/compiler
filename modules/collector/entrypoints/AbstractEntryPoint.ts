import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import { Node } from "ts-morph";
import {UniqQualifierRecognizer} from "common/qualifier/recognizer/SimpleQualifierRecognizer";
import {AbstractQualifierRecognizer} from "common/qualifier/recognizer/AbstractQualifierRecognizer";
import {UniqSimpleSchemaRepository} from "common/repository/schema/FileSeparatedSchemaRepository";
import {ProcessingManager} from "collector/processing/ProcessingManager";
import {Schema} from "common/schema/Schema";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {ProcessingManagerConfiguration} from "collector/processing/configuration/ProcessingManagerConfiguration";

export abstract class AbstractEntryPoint {

    private usedSchemaRepository: AbstractSchemaRepository = this.schemaRepository();

    private usedQualifierRecognizer: AbstractQualifierRecognizer = this.qualifierRecognizer();

    private manager!: ProcessingManager;

    public run(): Array<AbstractReference<Schema>> {
        if (!this.manager) {
            const config = ProcessingManager.configuration()
                .recognizer(this.usedQualifierRecognizer)
                .repository(this.usedSchemaRepository);
            this.manager = new ProcessingManager(config);
        }

       return this.manager.process()
           .as(Schema)
           .all(this.entryNodes());
    }

    public getRepository(): AbstractSchemaRepository {
        return this.usedSchemaRepository;
    }

    protected abstract entryNodes(): Array<Node>;

    protected schemaRepository(): AbstractSchemaRepository {
        return new UniqSimpleSchemaRepository();
    }

    protected qualifierRecognizer(): AbstractQualifierRecognizer {
        return new UniqQualifierRecognizer();
    }

}