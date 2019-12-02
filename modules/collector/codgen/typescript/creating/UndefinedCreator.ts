import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";

export class UndefinedCreator extends Creator<ts.Expression>{
    protected node(): ts.Expression {
        return ts.createVoidZero();
    }

}