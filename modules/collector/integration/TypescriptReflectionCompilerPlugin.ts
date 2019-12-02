import * as ts from 'typescript';
import {Inject} from "common/dependencies/annotations/Inject";
import {SourceFileEntryPoint} from "collector/entrypoints/SourceFileEntryPoint";
import {PackagingManager} from "common/packaging/PackagingManager";
import {StringsRepository} from "common/repository/StringsRepository";
import {TypescriptNodeCodeGenerator} from "collector/codgen/TypescriptNodeCodeGenerator";

export class TypescriptReflectionCompilerPlugin {

    @Inject
    private readonly codgen: TypescriptNodeCodeGenerator;

    public before(program: ts.Program) {
        return (context: ts.TransformationContext) => (file: ts.SourceFile) => {
            const entryPoint = new SourceFileEntryPoint(file.fileName);

            const packager = new PackagingManager(
                StringsRepository.empty(),
                entryPoint.getReferenceFactory()
            );

            const refs = entryPoint.run();
            const packages = packager.packAll(refs);

            this.codgen.addDeclaration(packages, file, program, context);
            this.codgen.addReferences(file, program, context);
        }
    }

}