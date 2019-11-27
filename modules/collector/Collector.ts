import "reflect-metadata";

function importAll(it: any) {
    it.keys().forEach(key => it(key));
}

// @ts-ignore
importAll(require.context("../common", true, /\.ts$/));
// @ts-ignore
importAll(require.context("./", true, /\.ts$/));

export {TypescriptReflectionCollectorWebpackPlugin} from 'collector/integration/TypescriptReflectionCollectorWebpackPlugin';

