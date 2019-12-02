import * as ts from "typescript";
import {Mapper} from "collector/codgen/typescript/map/Mapper";
import {Predicate} from "common/misc/utils/fn/Predicate";
import {BiAction} from "common/misc/utils/fn/BiAction";
import {Accessor} from "collector/codgen/typescript/accessor/Accessor";
import {TriFunction} from "common/misc/utils/fn/TriFunction";

export abstract class Clause<N extends ts.Node, U extends Mapper<N>, A extends Accessor<N>> {

    private mappingQueue: Array<TriFunction<N, ts.Program, ts.TransformationContext, ts.Node>> = [];

    private filters: Array<Predicate<A>> = [];

    public static matchAndMap<N extends ts.Node>(clause: Clause<N, Mapper<N>, Accessor<N>>, node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node {
        if (!clause.match(node)) {
            return node;
        }

        if (!clause.filters.every(it => it(clause.accessor(node)))) {
            return node;
        }

        return clause.mappingQueue.reduce((node, mapper) => mapper(node, program, context), node)
    }

    public map(action: BiAction<U, A>): void {
        this.enqueue((node, p, c) => {
            const mapper = this.mapper();
            const accessor = this.accessor(node);
            action(mapper, accessor);
            return Mapper.map(mapper, node, p, c);
        })

    }

    public when(predicate: Predicate<A>): this {
        this.filters.push(predicate);
        return this;
    }

    protected abstract match(node: ts.Node): node is N;

    protected abstract mapper(): U;

    protected abstract accessor(node: N): A

    private enqueue(action: TriFunction<N, ts.Program, ts.TransformationContext, ts.Node>) {
        this.mappingQueue.push(action);
    }
 }