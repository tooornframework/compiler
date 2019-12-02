import * as ts from "typescript";
import {Walker} from "collector/codgen/typescript/Walker";
import {Action} from "common/misc/utils/fn/Action";
import {TriFunction} from "common/misc/utils/fn/TriFunction";

export abstract class Mapper<N extends ts.Node> {
    public static map<N extends ts.Node>(updater: Mapper<N>, node: N, program: ts.Program, context: ts.TransformationContext): ts.Node {
        return updater.map(node, program, context);
    }

    private updates: Array<TriFunction<N, ts.Program, ts.TransformationContext, ts.Node>> = [];

    public walk(action: Action<Walker<N>>): void {
        this.enqueue((node, p, c) => {
            const walker = Walker.of(node, p, c);
            action(walker);
            return Walker.walk(walker);
        })
    }

    private map(node: N,  program: ts.Program, context: ts.TransformationContext): ts.Node {
        return this.updates.reduce((acc, executor) => executor(node, program, context), node)
    };

    protected enqueue<R extends ts.Node>(update: TriFunction<N, ts.Program, ts.TransformationContext, R>) {
        this.updates.push(update);
    }
}