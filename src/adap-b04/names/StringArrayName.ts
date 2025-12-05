import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";


export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        if (source == null || source == undefined) {
	        throw new IllegalArgumentException("source must not be null or undefined");
	    }
        this.components = source.map(c => {
        	if (c == null || c == undefined) {
                throw new IllegalArgumentException("Component must not be null or undefined");
            }
        	return this.unescape(c, this.delimiter);
        });
    }


    public asString(delimiter: string = this.delimiter): string {
		if (delimiter == null || delimiter.length != 1){
			throw new IllegalArgumentException("Delimiter must be a single character");
		}
        return this.components.join(delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
 		if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        let comp = this.components[i];
        if (comp == null || comp == undefined){
        	throw new InvalidStateException("Component must not be null or undefined");
        }
        return comp;	   
    }

    public setComponent(i: number, c: string) {
		if (c == null || c == undefined){
        	throw new IllegalArgumentException("Component must not be null or undefined");
        }
    	this.checkMaskingOfOneComponent(c);
    	c = this.unescape(c, this.delimiter);
    	if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        
        this.components[i] = c;
        if (this.components[i] == undefined || this.components[i] !== c){
        	throw new MethodFailedException("setComponent failed");
        }
    }

    public insert(i: number, c: string) {
		if (c == null || c == undefined){
        	throw new IllegalArgumentException("Component must not be null or undefined");
        }
    	this.checkMaskingOfOneComponent(c);
    	c = this.unescape(c, this.delimiter);
    	let length = this.components.length;
        if (i < 0 || i >= length) {
        	throw new IllegalArgumentException("Index out of bounds");
        }
        
        this.components.splice(i, 0, c);
        if (this.components[i] == null || this.components[i] == undefined 
        || this.components[i] !== c || this.getNoComponents() !== length + 1){
        	throw new MethodFailedException("insert failed");
        }
    }

    public append(c: string) {
		if (c == null || c == undefined){
    		throw new IllegalArgumentException("Component must not be null or undefined");
    	}
    	this.checkMaskingOfOneComponent(c);
    	c = this.unescape(c, this.delimiter);
    	let length = this.getNoComponents();
    	
        this.components.push(c);
        if(this.components[length] == null
        || this.components[length] == undefined
        || this.components[length] !== c
        || this.getNoComponents() !== length + 1){
        	throw new MethodFailedException("append failed");
        }
    }

    public remove(i: number) {
    	let length = this.getNoComponents();
        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        this.components.splice(i, 1);
        if (this.getNoComponents() !== length - 1){
        	throw new MethodFailedException("remove failed");
        }
    }

    public clone(): Name {
        const clone = Object.create(StringArrayName.prototype);
        clone.delimiter = this.delimiter;
        clone.components = [...this.components]; 
        return clone;
    }

}
