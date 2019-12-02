import {Service} from "common/dependencies/annotations/Service";
import {ReflectionBridge} from "collector/codgen/bridge/ReflectionBridge";
import {Inject} from "common/dependencies/annotations/Inject";
import ts = require("typescript");
import {Package} from "common/packaging/Package";
import {SourceFileClause} from "collector/codgen/typescript/clause/SourceFileClause";
import {CallCreator} from "collector/codgen/typescript/creating/CallCreator";
import {ArrayLiteralCreator} from "collector/codgen/typescript/creating/ArrayLiteralCreator";
import {Walker} from "collector/codgen/typescript/Walker";
import {ClassClause} from "collector/codgen/typescript/clause/ClassClause";
import {StringLiteralCreator} from "collector/codgen/typescript/creating/StringLiteralCreator";
import {LongNodeQualifier} from "collector/misc/qualifier/LongNodeQualifier";

@Service
export class TypescriptNodeCodeGenerator {

    @Inject
    private bridge: ReflectionBridge;

    public addDeclaration(packages: Array<Package<number, unknown>>, sf: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.Node {
        const walker = Walker.of(sf, program, context);

        walker.use(new SourceFileClause()).map((mapper) => {
            mapper.insert((creator) => {
                creator.expression((creator) => {
                    const callCreator = creator.use(new CallCreator());
                    callCreator.identifier(this.bridge.getReflectionDefinitionIdentifier());
                    callCreator.argument((creator) => {
                        const objectLiteralCreator = creator.use(new ArrayLiteralCreator());
                        objectLiteralCreator.fill(packages);
                    })
                })
            })
        });

        return Walker.walk(walker);
    }

    public addReferences(sf: ts.SourceFile, program: ts.Program, context: ts.TransformationContext) {
        const walker = Walker.of(sf, program, context);

        walker.use(new ClassClause()).map((mapper, accessor) => {
            mapper.addDecorator((creator) => {
                creator.name(this.bridge.getReflectionReferenceImportIdentifier());

                creator.argument((creator) => {
                    const stringLiteralCreator = creator.use(new StringLiteralCreator());
                    stringLiteralCreator.string(new LongNodeQualifier(accessor.getNode()).sym());
                });
            })
        });

        return Walker.walk(walker);
    }
}