import * as ts from "typescript";
import {Clause} from "collector/codgen/typescript/clause/Clause";
import {Mapper} from "collector/codgen/typescript/map/Mapper";
import {Accessor} from "collector/codgen/typescript/accessor/Accessor";

export class Walker<N extends ts.Node> {

    public static walk(walker: Walker<ts.Node>): ts.Node {
        return walker.walk();
    }

    public static of<N extends ts.Node>(node: N, program: ts.Program, context: ts.TransformationContext): Walker<N> {
        return new Walker(node, program, context);
    }

    private clauses: Array<Clause<ts.Node, Mapper<ts.Node>, Accessor<ts.Node>>> = [];

    private constructor(private node: ts.Node, private program: ts.Program, private context: ts.TransformationContext) {

    }

    public use<T extends Clause<ts.Node, Mapper<ts.Node>, Accessor<ts.Node>>>(clause: T): T {
        this.addClause(clause);
        return clause;
    }

    private walk(): ts.Node {
        return this.visitNodeAndChildren(this.node, this.program, this.context);
    }

    private visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext) {
        return ts.visitEachChild(this.visitNode(node, program, context), childNode => this.visitNodeAndChildren(childNode, program, context), context);
    }

    private visitNode(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node {
        console.log("visiting child" + ts.SyntaxKind[node.kind]);

        return this.clauses.reduce(
            (mappedNode, mapper) => Clause.matchAndMap(mapper, mappedNode, program, context), node
        );
    }

    private addClause(clause: Clause<ts.Node, Mapper<ts.Node>, Accessor<ts.Node>>) {
        this.clauses.push(clause);
    }

}