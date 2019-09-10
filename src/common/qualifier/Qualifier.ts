export abstract class Qualifier {

	public abstract equals(other: any): boolean;

	public abstract sym(): string;
}