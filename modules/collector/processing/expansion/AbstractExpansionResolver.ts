import {Qualifier} from "common/qualifier/Qualifier";

export abstract class AbstractExpansionResolver {
    public abstract shouldContinue(qualifier: Qualifier): boolean;
}