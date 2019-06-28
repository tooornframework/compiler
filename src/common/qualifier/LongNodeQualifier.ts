import {Qualifier} from "./Qualifier";
import {Node, TypeGuards} from "ts-morph";

class HierarcyCell {
	constructor(public readonly name: string, public readonly type: string, public readonly start: number, public readonly end: number) {

	}

	public toString(): string {
		return "[" + this.name + ":" + this.type + ":" + this.start + ":" + this.end + "]";
	}
}

export class LongNodeQualifier implements Qualifier {


	private hierarchyChain: Array<HierarcyCell> = [];

	public constructor(node: Node) {
		this.hierarchyChain = this.getHierarchyChain(node);
	}

	public equals(other: any): boolean {
		if (!(other instanceof LongNodeQualifier)) {
			return false;
		}

		return this.sym() === other.sym();
	}

	public sym(): string {
		return "LongNodeQualifier(" + this.hierarchyChain
			.map(it => it.toString())
			.join("") + ")";
	}

	private getHierarchyChain(node: Node): Array<HierarcyCell> {
		const parent = node.getParent();

		const cell = this.selectCellOrNull(node);

		if (!cell) {
			return parent ? this.getHierarchyChain(parent) : Array.of();
		}

		return parent ? this.getHierarchyChain(parent).concat(cell) : Array.of(cell);
	}

	private selectCellOrNull(node: Node): HierarcyCell | null {

			if (TypeGuards.isSourceFile(node)) {
				return new HierarcyCell(node.getFilePath(), "source", node.getStart(true), node.getEnd());
			}

			if (node.getSymbol()) {
				return new HierarcyCell(node.getSymbol().getName(), node.getKindName(), node.getStart(true), node.getEnd());
			}

			return null;
	}
}
