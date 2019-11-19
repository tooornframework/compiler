import {Service} from "../../dependencies/annotations/Service";
import {Class, NoArgsConstructorClass} from "../../common/utils/Class";
import {Schema} from "../Schema";
import {notNullOrThrow} from "../../common/utils/LangUtils";

@Service
export class SchemaRegistry {
    private nameToSchema = new Map<string, NoArgsConstructorClass<Schema>>();

    public define(Schema: NoArgsConstructorClass<Schema>) {
        this.nameToSchema.set(Schema.name, Schema);
    }

    public get(name: string) {
        return notNullOrThrow(this.nameToSchema.get(name));
    }
}