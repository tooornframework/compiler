import {Node, Type} from "ts-morph";
import {BaseTypeScheme} from "./BaseTypeScheme";
import {Qualifier} from "../../common/qualifier/Qualifier";
import {CompilerContext} from "../../context/CompilerContext";

export class DeclaredTypeScheme extends BaseTypeScheme {
	public sourceQualifiers: Array<Qualifier>;
	public typeArguments: Array<BaseTypeScheme> = [];

	public constructor(type: Type, context: CompilerContext) {
		super();
		this.sourceQualifiers = context.getDeclarationManager().getQualifiers(type);
		this.typeArguments = type.getTypeArguments()
		// veeeeery weird behaviour of compiler or ts-morph
			.filter(it => it.getText() !== "this")
			.map(it => context.getTypeManager().getScheme(it))
	}
}