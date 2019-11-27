import {MAPPER} from "../CollectingContextConstants";
import {ContextProvider} from "common/dependencies/ContextProvider";
import {Class} from "common/misc/utils/Class";

export function Mapper(Clazz: Class<any>) {
    ContextProvider.current().add(MAPPER, Clazz);
}