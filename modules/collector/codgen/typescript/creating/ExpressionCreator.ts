import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";

export class ExpressionCreator extends Creator<ts.Expression>{
    public use<C extends Creator<ts.Expression>>(creator: C): C {
        return super.use(creator);
    }
}

