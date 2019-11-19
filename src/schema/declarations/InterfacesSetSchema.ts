import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {InterfaceSchema} from "./InterfaceSchema";
import {NamedSchema} from "../context/annotations/NamedSchema";

@NamedSchema
export class InterfacesSetSchema extends Schema {
	interfaces: Array<QualifiedReference<InterfaceSchema>>
}