import {Creator} from "collector/codgen/typescript/creating/Creator";
import * as ts from "typescript";
import {JsonObject} from "common/misc/utils/Json";
import {CreatorFactory} from "collector/codgen/typescript/CreatorFactory";

export class ObjectLiteralCreator extends Creator<ts.ObjectLiteralExpression> {

    private assignments: Map<string, Creator<ts.Expression>> = new Map<string, Creator<ts.Expression>>();

    public json(value: JsonObject): this {

        Object.entries(value).map(([key, value]) => {
            this.assignments.set(key, CreatorFactory.expression(value));
        });

        return this;
    }

    protected node(): ts.ObjectLiteralExpression {
        const assignmentsNode = [];

        this.assignments.forEach((value, key) => {
            assignmentsNode.push(ts.createPropertyAssignment(key, Creator.create(value)))
        });

        return ts.createObjectLiteral(assignmentsNode);
    }
}