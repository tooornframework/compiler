import {Class} from "../../misc/utils/Class";
import {Context} from "../Context";
import {injectable} from "inversify";
import {Injectable} from "./Injectable";

export function Service(Class: Class<any>) {
    Context.current().bind(Injectable.on(Class)).toSelf();
}