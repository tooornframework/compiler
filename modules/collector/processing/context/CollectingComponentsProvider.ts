import {Service} from "common/dependencies/annotations/Service";
import {SchemeMapper} from "../SchemeMapper";
import {ContextProvider} from "common/dependencies/ContextProvider";
import {Inject} from "common/dependencies/annotations/Inject";
import {BUILDER, MAPPER, REDUCER} from "./CollectingContextConstants";
import {SchemaBuilder} from "../SchemaBuilder";
import {SchemeReducer} from "../SchemeReducer";
import {Schema} from "common/schema/Schema";
import {assertAll, curriedIsInstanceOf} from "common/misc/utils/LangUtils";

@Service
export class CollectingComponentsProvider {

    @Inject
    public contextProvider: ContextProvider;

    public getMappers(): Array<SchemeMapper<unknown, unknown>> {
        return assertAll(this.contextProvider.getAll(MAPPER), curriedIsInstanceOf(SchemeMapper));
    }

    public getReducers(): Array<SchemeReducer<Schema, Schema>> {
        return assertAll(this.contextProvider.getAll(REDUCER), curriedIsInstanceOf(SchemeReducer));
    }

    public getBuilders(): Array<SchemaBuilder<unknown, Schema>> {
        return assertAll(this.contextProvider.getAll(BUILDER), curriedIsInstanceOf(SchemaBuilder));
    }
}