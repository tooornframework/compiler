import {injectable} from "inversify";
import {AbstractClass, Class} from "../../misc/utils/Class";

export function Injectable(Class: Class<any> | AbstractClass<any> | Function | any) {
    injectable()(Class);
    return Class;
}

Injectable.on = (Class: Class<any>) => {
    return Injectable(Class);
}