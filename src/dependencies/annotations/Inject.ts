import {Context} from "../Context";

export function Inject(target: any, key: string) {
    return Context.inject()(Reflect.getMetadata("design:type", target, key))(target, key);
}