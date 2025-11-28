import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";
import { InvalidStateException } from "../common/InvalidStateException";


export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
    	if (delimiter == null || delimiter.length != 1) {
        	throw new IllegalArgumentException("Delimiter must be a single character");
        }
        this.delimiter = delimiter;
    }

    public clone(): Name {
        return Object.create(this);
    }

    public asString(delimiter: string = this.delimiter): string {
    	if (delimiter == null || delimiter.length != 1) {
    	    throw new IllegalArgumentException("Delimiter must be a single character");
    	}
        let s: string = "";
        for(let i = 0; i < this.getNoComponents(); i++) {
            s += this.getComponent(i);
            if (i < this.getNoComponents() - 1) {
                s += delimiter;
            }
        }
        return s;
        	
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
    	let s: string = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            s += this.escape(this.getComponent(i), this.delimiter);
            if (i < this.getNoComponents() - 1) {
                s += this.delimiter;
            }
        }
        return s;
    }

    public isEqual(other: Name): boolean {
    	if (other == null || other == undefined){
    		throw new IllegalArgumentException("Argument must not be null or undefined");
    	}
		if (this.delimiter !== other.getDelimiterCharacter()
        	|| this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
    	const str = this.asDataString();
        let hash = 0;
        if (str.length === 0) {
            return hash;
        }
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash | 0;
        }
        return hash;
    }

    public isEmpty(): boolean {
    	return this.getNoComponents()  === 0;
    }

    public getDelimiterCharacter(): string {
        return this.del
        imiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: 
    number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
    	if (other == null || other == undefined){
    		throw new IllegalArgumentException("Argument must not be null or undefined");
    	}
    	let concatLength = this.getNoComponents() + other.getNoComponents();
    	for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        if(this.getNoComponents() !== concatLength()){
        	throw new MethodFailureException("Concatenation failed");
        }
    }


	protected escape(s: string, delim: string): string {
        return s.split(delim).join(ESCAPE_CHARACTER + delim);
    }

    protected unescape(s: string, delim: string): string {
        return s.split(ESCAPE_CHARACTER + delim).join(delim);
    }


	protected checkMaskingOfOneComponent(s: string): void {
		let escaped = false;
		for (let i = 0; i < s.length; i++){
			if(escaped){
				if(s[i] !== ESCAPE_CHARACTER && s[i] !== this.delimiter){
					throw new IllegalArgumentException("wrong masking");
				}
				escaped = false;
			} else {
				if (s[i] === ESCAPE_CHARACTER){
					escaped = true;
				} else if (c[i] === this.delimiter){
					throw new IllegalArgumentException("wrong masking");
				}
			}
		}
		if (escaped){
			throw new IllegalArgumentException("wrong masking");
		}
	}


}
