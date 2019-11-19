import {Service} from "../../dependencies/annotations/Service";

@Service
export class ReflectionBridge {
	public getReflectionDefinitionImportCode(packages: string): string {
		return "window.Reflection.definition(" + packages + ");";
	}

	public getReflectionStringsRepositoryDefinitionImportCode(stringsRepository: string): string {
		return "window.Reflection.defineNameRegistry(" + stringsRepository + ");";
	}


	public getReflectionReferenceImportCode(reference: string, qualifier: string): string {
		return "window.Reflection.reference((" + reference + " as any), \"" + qualifier + "\")";
	}
}