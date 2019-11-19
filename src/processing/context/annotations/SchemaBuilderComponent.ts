
import {BUILDER} from "../CollectingContextConstants";
import {ContextProvider} from "../../../dependencies/ContextProvider";
import {Class} from "../../../common/utils/Class";

export function SchemaBuilderComponent(Clazz: Class<any>) {
    ContextProvider.current().add(BUILDER, Clazz);

}