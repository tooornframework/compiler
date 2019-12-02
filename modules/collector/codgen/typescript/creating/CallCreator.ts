import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";
import {ExpressionCreator} from "collector/codgen/typescript/creating/ExpressionCreator";
import {Action} from "common/misc/utils/fn/Action";

export class CallCreator extends Creator<ts.CallExpression>{

    private usedIdentifier: string;

    private arguments: Array<ExpressionCreator> = [];

    public argument(action: Action<ExpressionCreator>): this {
        const crtr = new ExpressionCreator();
        action(crtr);
        this.arguments.push(crtr);
        return this;
    }

    public identifier(identifier: string): this {
        this.usedIdentifier = identifier;
        return this;
    };

    protected node(): ts.CallExpression {
        return ts.createCall(
            ts.createIdentifier(this.usedIdentifier),
            undefined,
            this.arguments.map(it => Creator.create(it))
        );
    }

}