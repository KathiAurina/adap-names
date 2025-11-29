import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";
import { InvalidStateException } from "../common/InvalidStateException";


export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;
    private empty: boolean = true;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        if (source == null || source == undefined){
        	throw new IllegalArgumentException("source must not be null or undefined");
        }
        this.name = source;
        this.empty = false;
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
            throw new IllegalArgumentException("Index out of bounds");
        }
        let comps = this.splitStringName(this.name);
        let comp = comps[i];
        if (comp == null || comp == undefined){
        	throw new InvalidStateException("Component must not be null or undefined");
        }
        return this.unescape(comp, this.delimiter);
    }

    public setComponent(i: number, c: string) {
		this.checkMaskingOfComponent(c);
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        if (c == null || c == undefined){
        	throw new IllegalArgumentException("Component must not be null or undefined");
        }
        let comps = this.splitStringName(this.name);
        comps[i] = c;
        this.name = comps.join(this.delimiter);
        let newComp = this.getComponent(i);
        if (newComp == null || newComp == undefined || newComp !== c){
        	throw new MethodFailureException("setComponent failed");
        }   
    }

    public insert(i: number, c: string) {
    	this.checkMaskingOfComponent(c);
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        if (c == null || c == undefined){
        	throw new IllegalArgumentException("Component must not be null or undefined");
        }
        let comps = this.splitStringName(this.name);
        comps.splice(i, 0, this.escape(c, this.delimiter));
        this.name = comps.join(this.delimiter);
        let newComp = this.getComponent(i);
        if (newComp == null || newComp == undefined || newComp !== c){
        	throw new MethodFailureException("insert failed");
        } 
        this.noComponents++;
        if (this.getNoComponents() !== comps.length){
        	throw new MethodFailureException("insert failed")
        }
        this.empty = false;    
    }

    public append(c: string) {
    	this.checkMaskingOfComponent(c);
    	if (c == null || c == undefined){
    		throw new IllegalArgumentException("Component must not be null or undefined");
    	}
        let comps = this.splitStringName(this.name);
        comps.push(c);
        this.name = comps.join(this.delimiter);
        this.noComponents++;
        this.empty = false;
        let lastComp = this.getComponent(this.noComponents - 1);
        if (lastComp == null || lastComp == undefined || lastComp !== c){
        	throw new MethodFailureException("append failed");
        }
        if (this.noComponents !== comps.length){
        	throw new MethodFailureException("append failed");
        }
    }

    public remove(i: number) {
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        let comps = this.splitStringName(this.name);
        comps.splice(i, 1);
        this.name = comps.join(this.delimiter);
        this.noComponents--;
        if (this.noComponents !== comps.length){
        	throw new MethodFailureException("remove failed");	
        }
        if (this.noComponents == 0){
        	this.empty = true;
        }
    }

	public concat(other: Name): void {
		super.concat(other);
		this.empty = false;
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
