import {Package} from "../Package";
import {Hash} from "../../misc/utils/MappedType";

export interface SchemaPackage extends Package<6, Hash<Package<number, unknown>>>{
	n: number;
}