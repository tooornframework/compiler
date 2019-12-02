import {Mapper} from "collector/codgen/typescript/map/Mapper";
import * as ts from "typescript";
import {Action} from "common/misc/utils/fn/Action";
import {DecoratorCreator} from "collector/codgen/typescript/creating/DecoratorCreator";
import {Creator} from "collector/codgen/typescript/creating/Creator";

export class ClassMapper extends Mapper<ts.ClassDeclaration> {

    public addDecorator(decoratorCreator: Action<DecoratorCreator>) {
        const creator = new DecoratorCreator();

        decoratorCreator(creator);

        this.enqueue((node) => {
            const onlyNode = Array.of(Creator.create(creator));

            const decorators = node.decorators
                ? onlyNode.concat(node.decorators)
                : onlyNode;

            return ts.updateClassDeclaration(
                node,
                decorators,
                node.modifiers,
                node.name,
                node.typeParameters,
                node.heritageClauses,
                node.members
            );
        })

    }

}