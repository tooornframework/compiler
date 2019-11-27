import {ContextProvider} from "common/dependencies/ContextProvider";
import {Inject} from "common/dependencies/annotations/Inject";

function importAll(it: any) {
    it.keys().forEach(key => it(key));
}

// @ts-ignore
importAll(require.context("../common", true, /\.ts$/));
// @ts-ignore
importAll(require.context("./", true, /\.ts$/));

export class Client {

    @Inject
    private context: ContextProvider;

}