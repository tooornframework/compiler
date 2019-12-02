import {Clause} from "collector/codgen/typescript/clause/Clause";
import * as ts from "typescript";
import {ClassMapper} from "collector/codgen/typescript/map/ClassMapper";
import {ClassAccessor} from "collector/codgen/typescript/accessor/ClassAccessor";

export class ClassClause extends Clause<ts.ClassDeclaration, ClassMapper, ClassAccessor> {

    protected mapper(): ClassMapper {
        return new ClassMapper();
    }

    protected match(node: ts.Node): node is ts.ClassDeclaration {
        return ts.isClassDeclaration(node);
    }

    protected accessor(node: ts.ClassDeclaration): ClassAccessor {
        return new ClassAccessor(node);
    }
}