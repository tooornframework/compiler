import {MAPPER} from "../CollectingContextConstants";
import {ContextProvider} from "../../../dependencies/ContextProvider";
import {Class} from "../../../common/utils/Class";

export function Mapper(Clazz: Class<any>) {
    ContextProvider.current().add(MAPPER, Clazz);
}