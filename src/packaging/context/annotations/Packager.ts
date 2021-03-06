import {Class} from "../../../common/utils/Class";
import {ContextProvider} from "../../../dependencies/ContextProvider";
import {PACKAGER} from "../PackagerContextConstants";

export function Packager(Clazz: Class<any>) {
    ContextProvider.current().add(PACKAGER, Clazz)
}