import * as ts from 'typescript';

export class CompilerPlugin {
    public before(program: ts.Program) {
        return (context: ts.TransformationContext) => (file: ts.SourceFile) => this.visitNodeAndChildren(file, program, context)
    }

    private visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext) {
        return ts.visitEachChild(this.visitNode(node), childNode => this.visitNodeAndChildren(childNode, program, context), context);
    }

    private visitNode(node: ts.Node) {
        if (!ts.isClassDeclaration(node)) {
            return node;
        }

        const decorator = ts.createDecorator(ts.createIdentifier("window.Some"));
        return ts.updateClassDeclaration(node, [decorator], node.modifiers, node.name, node.typeParameters, node.heritageClauses, node.members);
    }
}
