export interface JsonArray extends Array<Json> {

}

export interface JsonObject extends Object {

}

export type JsonValue = string | number | null;

export type Json = JsonArray | JsonObject | JsonValue;
