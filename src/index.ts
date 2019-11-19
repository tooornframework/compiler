import "reflect-metadata";
import {WebpackPlugin} from "./integration/WebpackPlugin";
import {AdvancedLoader} from "./common/utils/AdvancedLoader";
import { CompilerPlugin } from "./integration/CompilerPlugin";
new AdvancedLoader().loadAll(__dirname);

export { WebpackPlugin as WebpackPlugin, CompilerPlugin as CompilerPlugin };

