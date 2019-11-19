import {injectable} from "inversify";
import {AbstractClass, Class} from "../../common/utils/Class";

export function Injectable(Class: Class<any> | AbstractClass<any> | Function | any) {
    injectable()(Class);
    return Class;
}

Injectable.on = (Class: Class<any>) => {
    return Injectable(Class);
}