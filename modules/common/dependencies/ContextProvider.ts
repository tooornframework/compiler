import {Class} from "../misc/utils/Class";
import {Context} from "./Context";
import {Injectable} from "./annotations/Injectable";
import {Service} from "./annotations/Service";

@Service
export class ContextProvider {

    static current(): ContextProvider {
        return Context.current().get(ContextProvider);
    }

    public add(symbol: symbol, Clazz: Class<any>) {
        Context.current().bind(symbol).to(Injectable.on(Clazz)).inSingletonScope();
    }

    public get<T>(Clazz: Class<T>): T {
        return Context.current().get(Clazz);
    }

    public getAll(symbol: symbol) {
        return Context.current().getAll(symbol)
    }
}