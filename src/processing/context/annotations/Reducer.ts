import {Class} from "../../../common/utils/Class";
import {REDUCER} from "../CollectingContextConstants";
import {ContextProvider} from "../../../dependencies/ContextProvider";

export function Reducer(Clazz: Class<unknown>) {
    ContextProvider.current().add(REDUCER, Clazz);
}
