import {Schema} from "../Schema";
import {QualifiedReference} from "../../common/reference/QualifiedReference";
import {InterfaceSchema} from "./InterfaceSchema";

export class InterfacesSetSchema extends Schema {
	interfaces: Array<QualifiedReference<InterfaceSchema>>
}