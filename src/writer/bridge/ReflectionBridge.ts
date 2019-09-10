export class ReflectionBridge {
	public getReflectionDefinitionImportCode(packages: string): string {
		return "window.Reflection.definition(" + packages + ")";
	}

	public getReflectionReferenceImportCode(reference: string, qualifier: string): string {
		return "window.Reflection.reference((" + reference + " as any), \"" + qualifier + "\")";
	}
}