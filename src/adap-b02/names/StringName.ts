import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.name = source;
        this.noComponents = this.splitStringName(source).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        //replace delimiter in name with new delimiter
        return this.splitStringName(this.name).map(s => this.unescape(s, this.delimiter)).join(delimiter);
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        if (x < 0 || x >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        return this.unescape(this.splitStringName(this.name)[x], this.delimiter);
    }

    public setComponent(n: number, c: string): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        let components = this.splitStringName(this.name);
        components[n] = this.escape(c, this.delimiter);
        this.name = components.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        let components = this.splitStringName(this.name);
        components.splice(n, 0, this.escape(c, this.delimiter));
        this.name = components.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string): void {
        let components = this.splitStringName(this.name);
        components.push(this.escape(c, this.delimiter));
        this.name = components.join(this.delimiter);
        this.noComponents++;
    }

    public remove(n: number): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        let components = this.splitStringName(this.name);
        components.splice(n, 1);
        this.name = components.join(this.delimiter);
        this.noComponents--;
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    private escape(s: string, delim: string): string {
        return s.split(delim).join(ESCAPE_CHARACTER + delim);
    }

    private unescape(s: string, delim: string): string {
        return s.split(ESCAPE_CHARACTER + delim).join(delim);
    }

    private splitStringName(s: string): string[] {
        if (s === "") {
            return [];
        }

        let components: string[] = [];
        let currentComponent: string = "";

        for (let i = 0; i < s.length; ) {

            if (s[i] === ESCAPE_CHARACTER && i + 1 < s.length && s[i + 1] === this.delimiter) {
                currentComponent += s[i];
                currentComponent += s[i+1];
                i += 2;
            } else if (s[i] === this.delimiter) {
                components.push(currentComponent);
                currentComponent = "";
                i++;
            } else {
                currentComponent += s[i];
                i++;
            }
        }
        components.push(currentComponent);
        return components;
    }

}