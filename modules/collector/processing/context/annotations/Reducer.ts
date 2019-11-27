import {Class} from "common/misc/utils/Class";
import {REDUCER} from "../CollectingContextConstants";
import {ContextProvider} from "common/dependencies/ContextProvider";

export function Reducer(Clazz: Class<unknown>) {
    ContextProvider.current().add(REDUCER, Clazz);
}
