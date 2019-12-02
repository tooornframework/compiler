import * as ts from "typescript";

export class Accessor<N extends ts.Node> {
    constructor(private node: N) {

    }

    public getNode() {
        return this.node;
    }
}