import {Schema} from "../../schema/Schema";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {AbstractSchemaRepository} from "./AbstractSchemaRepository";

export class SimpleSchemaRepository extends AbstractSchemaRepository {
    private map = new Map<string, Schema>();

    private duplicates = new Set()

    public set(scheme: Schema): void {
        this.map.set(scheme.qualifier.sym(), scheme);
    }

    public get(qualifier: Qualifier): Schema {
        return this.map.get(qualifier.sym());
    }

    public keys(): Array<string> {
        return Array.from(this.map.keys());
    }

    public values(): Array<Schema> {
        return Array.from(this.map.values());
    }

    public clean() {
        this.map = new Map<string, Schema>();
    }
}