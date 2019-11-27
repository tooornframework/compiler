import {AbstractQualifierRecognizer} from "./AbstractQualifierRecognizer";
import {Qualifier} from "../Qualifier";

export class UniqQualifierRecognizer extends AbstractQualifierRecognizer {
    private set: Set<string> = new Set();

    public discover(qualifier: Qualifier): void {
        this.set.add(qualifier.sym());
    }

    public isDiscovered(qualifier: Qualifier): boolean {
        return this.set.has(qualifier.sym());
    }

}