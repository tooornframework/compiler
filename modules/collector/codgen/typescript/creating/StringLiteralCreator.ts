import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";

export class StringLiteralCreator extends Creator<ts.StringLiteral>{

    private usedString: string;

    public string(value: string): this {
        this.usedString = value;
        return this;
    }

    protected node(): ts.StringLiteral {
        return ts.createStringLiteral(this.usedString);
    }
}