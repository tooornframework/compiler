import "reflect-metadata";

import {TypescriptReflectionCollectorWebpackPlugin} from "./integration/TypescriptReflectionCollectorWebpackPlugin";
import {AdvancedLoader} from "./common/utils/AdvancedLoader";

new AdvancedLoader().loadAll(__dirname);

export { TypescriptReflectionCollectorWebpackPlugin as TypescriptReflectionCollectorWebpackPlugin };

