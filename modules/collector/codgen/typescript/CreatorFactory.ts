import * as ts from "typescript";
import {Creator} from "collector/codgen/typescript/creating/Creator";
import {StringLiteralCreator} from "collector/codgen/typescript/creating/StringLiteralCreator";
import {NumberLiteralCreator} from "collector/codgen/typescript/creating/NumberLiteralCreator";
import {UndefinedCreator} from "collector/codgen/typescript/creating/UndefinedCreator";
import {NullCreator} from "collector/codgen/typescript/creating/NullCreator";
import {ObjectLiteralCreator} from "collector/codgen/typescript/creating/ObjectLiteralCreator";
import {ArrayLiteralCreator} from "collector/codgen/typescript/creating/ArrayLiteralCreator";
import {JsonArray, JsonObject} from "common/misc/utils/Json";

export class CreatorFactory {

    public static expression<T>(value: T): Creator<ts.Expression> {
        if (typeof value === "string") {
            return this.getCreatorForString(value)
        }

        if (typeof value === "number") {
            return this.getCreatorForNumber(value)
        }

        if (typeof value === "undefined") {
            return this.getCreatorForUndefined();
        }

        if (value === null) {
            return this.getCreatorForNUll();
        }

        if (Array.isArray(value)) {
            return this.getCreatorForArray(value);
        }

        if (typeof value === "object") {
            return this.getCreatorForObjectLiteral(value);
        }

        throw new Error("value " + value + " is not supported");
    }

    private static getCreatorForString(value: string) {
        const crtr = new StringLiteralCreator();
        crtr.string(value);
        return crtr;
    }

    private static getCreatorForNumber(value: number) {
        const crtr = new NumberLiteralCreator();
        crtr.number(value);
        return crtr;
    }

    private static getCreatorForUndefined() {
        return new UndefinedCreator();
    }

    private static getCreatorForNUll() {
        return new NullCreator()
    }

    private static getCreatorForObjectLiteral(value: JsonObject) {
        const crtr = new ObjectLiteralCreator();
        crtr.json(value);
        return crtr;
    }

    private static getCreatorForArray(value: JsonArray) {
        const crtr = new ArrayLiteralCreator();
        crtr.fill(value);
        return crtr;
    }
}