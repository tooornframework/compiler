import {Node, Type} from "ts-morph";

export function hasTextInOneOf(nodes: Array<Node>, text: string): boolean {
	return !!nodes.find(it => it.getText() === text);
}

export function isTypePlain(x: Type): boolean {
	return
}