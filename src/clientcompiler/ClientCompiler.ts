import * as webpack from "webpack";
import {Service} from "../dependencies/annotations/Service";
import * as AppRoot from "app-root-path"
import * as Path from "path";
import * as FS from "fs";

@Service
export class ClientCompiler {
    public static readonly LIB_NAME = "tooorn-metadata";

    private static readonly OUTPUT =  Path.join(AppRoot.path, "build/client");
    private static readonly FILENAME = "Client.js";
    private static readonly OUTPUT_FILENAME = Path.join(ClientCompiler.OUTPUT, ClientCompiler.FILENAME);
    private static readonly ENTRY = Path.join(AppRoot.path, "src/client/Client.ts");

    public compileAndGetOutput(): Promise<string> {
        return new Promise((rs, rj) => {
            webpack(this.getWebpackCompilerConfiguration()).run((err) => {
                if (err) {
                    rj(err);
                    return;
                }
                rs(FS.readFileSync(ClientCompiler.OUTPUT_FILENAME).toString());
            })
        })

    }


    public getWebpackCompilerConfiguration() {
        return {
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            entry: {
                app: ClientCompiler.ENTRY
            },
            output: {
                path: ClientCompiler.OUTPUT,
                filename: ClientCompiler.FILENAME
            }
        }
    }
}