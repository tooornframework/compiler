import {Service} from "common/dependencies/annotations/Service";

@Service
export class ReflectionBridge {

	public getReflectionReferenceImportIdentifier(): string {
		return "window.RVC.ref"
	}

	public getReflectionDefinitionIdentifier() {
		return "window.RVC.d";
	}

	public getReflectionStringsRepositoryIdentifier() {
		return "window.RVC.ds"
	}
}