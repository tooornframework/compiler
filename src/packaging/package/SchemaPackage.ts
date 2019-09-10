import {Package} from "../Package";
import {Hash} from "../../common/utils/MappedType";

export interface SchemaPackage extends Package<6, Hash<Package<number, unknown>>>{
	n: number;
}