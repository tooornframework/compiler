import {Mapper} from "collector/codgen/typescript/map/Mapper";
import * as ts from "typescript";
import {Action} from "common/misc/utils/fn/Action";
import {ExpressionStatementCreator} from "collector/codgen/typescript/creating/ExpressionStatementCreator";
import {Creator} from "collector/codgen/typescript/creating/Creator";

export class SourceFileMapper extends Mapper<ts.SourceFile>{
    public insert(action: Action<ExpressionStatementCreator>) {
        const creator = new ExpressionStatementCreator();
        action(creator);

        this.enqueue((sf) => {
            const onlyStmt = Array.of<ts.Statement>(Creator.create(creator));
            const nextStmts = onlyStmt.concat(sf.statements);
            return ts.updateSourceFileNode(sf, nextStmts);
        })
    }
}