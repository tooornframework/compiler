import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";

export class NullCreator extends Creator<ts.NullLiteral> {
    protected node(): ts.NullLiteral {
        return ts.createNull();
    }
}