import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";
import {Action} from "common/misc/utils/fn/Action";
import {ExpressionCreator} from "collector/codgen/typescript/creating/ExpressionCreator";

export class ExpressionStatementCreator extends Creator<ts.ExpressionStatement>{

    private expressionCreator: ExpressionCreator;

    public expression(action: Action<ExpressionCreator>) {
        this.expressionCreator = new ExpressionCreator();
        action(this.expressionCreator);
    }

    protected node(): ts.ExpressionStatement {
        return ts.createExpressionStatement(Creator.create(this.expressionCreator));
    }
}