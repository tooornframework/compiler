import {Qualifier} from "common/qualifier/Qualifier";
import {Node, TypeGuards} from "ts-morph";
import { Node as TsNode, isSourceFile, Symbol, SyntaxKind } from "typescript";

class HierarchyCell {
	public static readonly SOURCE_FILE = "source";

	constructor(public readonly name: string, public readonly type: string, public readonly start: number, public readonly end: number) {

	}

	public toString(): string {
		return "[" + this.name + ":" + this.type + ":" + this.start + ":" + this.end + "]";
	}

	public isSourceFile() {
		return this.type === HierarchyCell.SOURCE_FILE;
	}
}

export class LongNodeQualifier extends Qualifier {

	private hierarchyChain: Array<HierarchyCell> = [];

	public constructor(node: Node | TsNode) {
		super();
		this.hierarchyChain = this.createHierarchyChain(node instanceof Node ? node.compilerNode : node);
	}

	public equals(other: any): boolean {
		if (!(other instanceof LongNodeQualifier)) {
			return false;
		}

		return this.sym() === other.sym();
	}

	public sym(): string {
		return "LongNodeQualifier(" + this.hierarchyChain.map(it => it.toString()).join("") + ")";
	}

	public getHierarchyChain() {
		return this.hierarchyChain;
	}

	private createHierarchyChain(node: TsNode): Array<HierarchyCell> {
		const parent = node.parent;

		const cell = this.selectCellOrNull(node);

		if (!cell) {
			return parent ? this.createHierarchyChain(parent) : Array.of();
		}

		return parent ? this.createHierarchyChain(parent).concat(cell) : Array.of(cell);
	}

	private selectCellOrNull(node: TsNode): HierarchyCell | null {

			if (isSourceFile(node)) {
				return new HierarchyCell(node.fileName, HierarchyCell.SOURCE_FILE, node.getStart(), node.getEnd());
			}

			const symbol: Symbol | null = (node as any).symbol;

			if (symbol) {
				return new HierarchyCell(symbol.name, SyntaxKind[node.kind], node.getStart(), node.getEnd());
			}

			return null;
	}
}
