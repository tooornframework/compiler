
import {BUILDER} from "../CollectingContextConstants";
import {ContextProvider} from "common/dependencies/ContextProvider";
import {Class} from "common/misc/utils/Class";

export function SchemaBuilderComponent(Clazz: Class<any>) {
    ContextProvider.current().add(BUILDER, Clazz);

}