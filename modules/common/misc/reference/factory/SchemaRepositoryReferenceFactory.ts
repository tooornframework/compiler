import {AbstractReferenceFactory} from "common/misc/reference/factory/AbstractReferenceFactory";
import {AbstractSchemaRepository} from "common/repository/schema/AbstractSchemaRepository";
import {Schema} from "common/schema/Schema";
import {Qualifier} from "common/qualifier/Qualifier";
import {Class} from "common/misc/utils/Class";
import {AbstractReference} from "common/misc/reference/AbstractReference";
import {RegularReference} from "common/misc/reference/RegularReference";
import {EmptyRefernce} from "common/misc/reference/EmptyRefernce";

export class SchemaRepositoryReferenceFactory extends AbstractReferenceFactory {
    public constructor(private schemaRepository: AbstractSchemaRepository) {
        super();
    }

    public from<C extends Schema>(qualifier: Qualifier, Clazz: Array<Class<C>>): AbstractReference<C> {
        return new RegularReference(qualifier, (q) => this.lookup(q), Clazz);
    }

    public empty<C extends Schema>(): AbstractReference<C> {
        return new EmptyRefernce();
    }

    protected lookup(qualifier: Qualifier): Schema {
        if (!this.schemaRepository) {
            throw new Error("Schema repository is undefined??");
        }
        return this.schemaRepository.get(qualifier);
    }
}