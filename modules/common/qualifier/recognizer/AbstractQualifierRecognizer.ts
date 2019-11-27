import {Qualifier} from "common/qualifier/Qualifier";

export abstract class AbstractQualifierRecognizer {
    public abstract discover(qualifier: Qualifier): void;
    public abstract isDiscovered(qualifier: Qualifier): boolean
}