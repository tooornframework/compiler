import {Schema} from "../Schema";
import {AbstractReference} from "../../misc/reference/AbstractReference";
import {InterfaceSchema} from "./InterfaceSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class InterfacesSetSchema extends Schema {
	interfaces: Array<AbstractReference<InterfaceSchema>>
}