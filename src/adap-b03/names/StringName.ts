import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.splitStringName(this.name).length;
    }

    public asDataString(): string {
        return this.name;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        return this.unescape(this.splitStringName(this.name)[i], this.delimiter);
    }

    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        let components = this.splitStringName(this.name);
        components[i] = this.escape(c, this.delimiter);
        this.name = components.join(this.delimiter);    }

    public insert(i: number, c: string) {
        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        let components = this.splitStringName(this.name);
        components.splice(i, 0, this.escape(c, this.delimiter));
        this.name = components.join(this.delimiter);
        this.noComponents++;    }

    public append(c: string) {
        let components = this.splitStringName(this.name);
        components.push(this.escape(c, this.delimiter));
        this.name = components.join(this.delimiter);
        this.noComponents++;    }

    public remove(i: number) {
        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        let components = this.splitStringName(this.name);
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents--;    }


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