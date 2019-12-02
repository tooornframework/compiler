import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";
import {ExpressionCreator} from "collector/codgen/typescript/creating/ExpressionCreator";
import {Action} from "common/misc/utils/fn/Action";

export class DecoratorCreator extends Creator<ts.Decorator>{

    private usedName: string;
    private arguments: Array<Creator<ts.Expression>> = [];

    public name(name: string): this {
        this.usedName = name;
        return this;
    }

    public argument(action: Action<ExpressionCreator>): this {
        const creator = new ExpressionCreator();
        action(creator);
        this.arguments.push(creator);
        return this;
    }

    protected node() {
        return ts.createDecorator(ts.createCall(
            ts.createIdentifier(this.usedName),
            undefined,
            this.arguments.map(it => Creator.create(it))
        ));
    }
}