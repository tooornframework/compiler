import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";

export class NumberLiteralCreator extends Creator<ts.NumericLiteral> {

    private usedNumber: number;

    public number(value: number) {
        this.usedNumber = value;
    }

    protected node(): ts.NumericLiteral {
        return ts.createNumericLiteral(this.usedNumber.toString());
    }

}