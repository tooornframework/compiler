import * as ts from "typescript";

export class Creator<T extends ts.Node> {
    private childCreator: Creator<T>;

    protected use<C extends Creator<T>>(creator: C): C {
        this.childCreator = creator;
        return creator;
    }

    public static create<T extends ts.Node>(creator: Creator<T>): T {
        return creator.node();
    }

    protected node(): T {
        if (!this.childCreator) {
            throw new Error("Creating was failed");
        }

        return Creator.create(this.childCreator);
    };
}