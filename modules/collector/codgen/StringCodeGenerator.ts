import {ReflectionBridge} from "./bridge/ReflectionBridge";
import { readFileSync } from "fs";
import {Inject} from "common/dependencies/annotations/Inject";
import {Service} from "common/dependencies/annotations/Service";
import {Json} from "common/misc/utils/Json";
import * as Path from "path";
import * as AppRoot from "app-root-path";

@Service
export class StringCodeGenerator {

	@Inject
	private readonly bridge: ReflectionBridge;

	public createPackagesDefinition(packages: Array<object>) {
		const stringifierPackages = JSON.stringify(packages);
		return this.bridge.getReflectionDefinitionIdentifier() + "(" + stringifierPackages + ")";

	}

	public createStringsDefinition(stringsRepository: Json) {
		const stringifierPackages = JSON.stringify(stringsRepository);
		return this.bridge.getReflectionStringsRepositoryIdentifier() + "(" + stringifierPackages + ")";

	}

	public getRVC() {
		return readFileSync(Path.join(AppRoot.path, "resources/RVC.js")).toString();
	}

	public separateToSeveralLines(...args: Array<string>) {
		return "\n" + args.join("\n") + "\n";
	}
}
