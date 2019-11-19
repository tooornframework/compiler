import {Service} from "../../dependencies/annotations/Service";

@Service
export class ReflectionBridge {
	public getReflectionDefinitionImportCode(packages: string): string {
		return "window.RVC.d(" + packages + ");";
	}

	public getReflectionStringsRepositoryDefinitionImportCode(stringsRepository: string): string {
		return "window.RVC.ds(" + stringsRepository + ");";
	}


	public getReflectionReferenceImportCode(): string {
		return "window.RVC.ref"
	}
}