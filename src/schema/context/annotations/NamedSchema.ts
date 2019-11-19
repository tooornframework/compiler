import {SchemaRegistry} from "../SchemaRegistry";
import { NoArgsConstructorClass} from "../../../common/utils/Class";
import {Schema} from "../../Schema";
import {ContextProvider} from "../../../dependencies/ContextProvider";

export function NamedSchema(Class: NoArgsConstructorClass<Schema>) {
 ContextProvider.current().get(SchemaRegistry).define(Class);
}