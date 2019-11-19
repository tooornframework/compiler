import {AbstractPackager} from "../AbstractPackager";
import {Package} from "../Package";
import {Service} from "../../dependencies/annotations/Service";
import {PACKAGER} from "./PackagerContextConstants";
import {ContextProvider} from "../../dependencies/ContextProvider";
import {Inject} from "../../dependencies/annotations/Inject";
import {assertAll, curriedIsInstanceOf} from "../../common/utils/LangUtils";

@Service
export class PackagersProvider {

    @Inject
    private contextProvider: ContextProvider;

    public getAll(): Array<AbstractPackager<unknown, Package<number, unknown>>> {
        return assertAll(this.contextProvider.getAll(PACKAGER), curriedIsInstanceOf(AbstractPackager));
    }
}