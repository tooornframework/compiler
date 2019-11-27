import {SchemaRegistry} from "../SchemaRegistry";
import { NoArgsConstructorClass} from "common/misc/utils/Class";
import {Schema} from "../../Schema";
import {ContextProvider} from "common/dependencies/ContextProvider";

export function NamedSchema(Class: NoArgsConstructorClass<Schema>) {
 ContextProvider.current().get(SchemaRegistry).define(Class);
}