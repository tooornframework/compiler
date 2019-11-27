import {AbstractPackager} from "common/packaging/AbstractPackager";
import {Package} from "common/packaging/Package";
import {Service} from "common/dependencies/annotations/Service";
import {PACKAGER} from "common/packaging/context/PackagerContextConstants";
import {ContextProvider} from "common/dependencies/ContextProvider";
import {Inject} from "common/dependencies/annotations/Inject";
import {assertAll, curriedIsInstanceOf} from "common/misc/utils/LangUtils";

@Service
export class PackagersProvider {

    @Inject
    private contextProvider: ContextProvider;

    public getAll(): Array<AbstractPackager<unknown, Package<number, unknown>>> {
        return assertAll(this.contextProvider.getAll(PACKAGER), curriedIsInstanceOf(AbstractPackager));
    }
}