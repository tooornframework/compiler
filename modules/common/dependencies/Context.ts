import {Container} from "inversify";
import Once from "lodash-decorators/onceAll.js";
import decorators from "inversify-inject-decorators";

export class Context extends Container {

    @Once()
    static current(): Context {
        return new Context();
    }

    @Once()
    static inject() {
        return decorators(Context.current()).lazyInject;
    }
}
