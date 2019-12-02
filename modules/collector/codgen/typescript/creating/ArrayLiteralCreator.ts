import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";
import {JsonArray} from "common/misc/utils/Json";
import {CreatorFactory} from "collector/codgen/typescript/CreatorFactory";

export class ArrayLiteralCreator extends Creator<ts.ArrayLiteralExpression> {
    private elements: Array<Creator<ts.Expression>> = [];

    public fill(json: JsonArray): this {
        json.forEach(it => (
            this.elements.push(CreatorFactory.expression(it))
        ));
        return this;
    }

    protected node(): ts.ArrayLiteralExpression {
        return ts.createArrayLiteral(
            this.elements.map(it => Creator.create(it))
        )
    }

}