import * as ts from 'typescript';
import {CodeGenerator} from "../codgen/CodeGenerator";
import {Inject} from "common/dependencies/annotations/Inject";
import {LongNodeQualifier} from "collector/misc/qualifier/LongNodeQualifier";

export class TypescriptReflectionCompilerPlugin {

    @Inject
    private codegen: CodeGenerator;

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

        const qualifier = new LongNodeQualifier(node);

        const qualifierAsStringLiteral = ts.createStringLiteral(qualifier.sym());

        const call = ts.createCall(
            ts.createIdentifier(this.codegen.getRefDecorator()),
            undefined,
            [qualifierAsStringLiteral]
        );

        const decorator = ts.createDecorator(call);

        const decorators = (node.decorators || []).concat(decorator);

        return ts.updateClassDeclaration(
            node,
            decorators,
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses,
            node.members
        );
    }
}
