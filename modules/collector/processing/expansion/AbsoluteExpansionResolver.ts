import {AbstractExpansionResolver} from "collector/processing/expansion/AbstractExpansionResolver";
import {Qualifier} from "common/qualifier/Qualifier";

export class AbsoluteExpansionResolver extends AbstractExpansionResolver {
    public shouldContinue(qualifier: Qualifier): boolean {
        return true;
    }

}