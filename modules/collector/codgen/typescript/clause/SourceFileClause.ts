import {Clause} from "collector/codgen/typescript/clause/Clause";
import * as ts from "typescript";
import {SourceFileMapper} from "collector/codgen/typescript/map/SourceFileMapper";
import {Accessor} from "collector/codgen/typescript/accessor/Accessor";
import {SourceFileAccessor} from "collector/codgen/typescript/accessor/SourceFileAccessor";

export class SourceFileClause extends Clause<ts.SourceFile, SourceFileMapper, SourceFileAccessor> {
    protected match(node: ts.Node): node is ts.SourceFile {
        return ts.isSourceFile(node);
    }

    protected mapper(): SourceFileMapper {
        return new SourceFileMapper();
    }

    protected accessor(node: ts.SourceFile): Accessor<ts.SourceFile> {
        return new SourceFileAccessor(node);
    }

}