import {Qualifier} from "./Qualifier";
import {Node, TypeGuards} from "ts-morph";

class HierarcyCell {
	constructor(public readonly name: string, public readonly type: string) {

	}
}

export class NodeQualifier extends Qualifier {


	private hierarchyChain: Array<HierarcyCell> = [];

	public constructor(node: Node) {
		super();
		this.hierarchyChain = this.getHierarchyChain(node);
	}

	public equals(other: any): boolean {
		if (!(other instanceof NodeQualifier)) {
			return false;
		}

		return this.hash() === other.hash();
	}

	public hash(): string {
		return this.hierarchyChain
			.map(it => "[" + it.name + ":" + it.type + "]"  )
			.join("");
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
				return new HierarcyCell(node.getFilePath(), "source");
			}

			if (node.getSymbol()) {
				return new HierarcyCell(node.getSymbol().getName(), node.getKindName());
			}

			return null;
	}
}
