import { describe, it, expect, beforeEach } from "vitest";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";


describe("StringArrayName Tests", () => {
	let n: Name;
	beforeEach(() => {
		n = new StringArrayName(["oss", "fau", "de"]);
	}); 

	it("constructor with null", () => {
		expect(() => new StringArrayName(["oss", null] as any)).toThrow(IllegalArgumentException);
	});
	
	it("constructor with undefined", () => {
		expect(() => new StringArrayName(["oss", undefined] as any)).toThrow(IllegalArgumentException);
	});
	
	it("constructor with valid expressions", () => {
		expect(n.getNoComponents()).toBe(3);
		expect(n.asString(".")).toBe("oss.fau.de");
	});
	
	it("clone", () => {
		let clone = n.clone() as Name;
		expect(clone.getNoComponents()).toBe(3);
		expect(clone.asString(".")).toBe("oss.fau.de");
		expect(clone).not.toBe(n);
		expect(clone).toEqual(n);
	});
	
	it("asString with delimiter null", () => {
		expect(() => n.asString(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("asString with valid expressions", () => {
		expect(n.asString("#")).toBe("oss#fau#de");
	});
	
	it.each([
		{method: 'getComponent', action: () => n.getComponent(-1) },
		{method: 'setComponent', action: () => n.setComponent(-1, "cs") },
		{method: 'insert', action: () => n.insert(-1, "cs") },
		{method: 'remove', action: () => n.remove(-1) }
	])("negative Index should throw IllegalArgumentException", ({ action }) => {		
		expect(action).toThrow(IllegalArgumentException);
	});
	
	it.each([
			{method: 'getComponent', action: () => n.getComponent(5) },
			{method: 'setComponent', action: () => n.setComponent(5, "cs") },
			{method: 'insert', action: () => n.insert(5, "cs") },
			{method: 'remove', action: () => n.remove(5) }
		])("too high Index should throw IllegalArgumentException", ({ action }) => {		
			expect(action).toThrow(IllegalArgumentException);
	});
	
	it("manipulation methods with null component should throw IAE", () => {
	    expect(() => n.insert(0, null as any)).toThrow(IllegalArgumentException);
	    expect(() => n.setComponent(0, null as any)).toThrow(IllegalArgumentException);
	    expect(() => n.append(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("manipulation methods with undefined component should throw IAE", () => {
	    expect(() => n.insert(0, undefined as any)).toThrow(IllegalArgumentException);
	    expect(() => n.setComponent(0, undefined as any)).toThrow(IllegalArgumentException);
	    expect(() => n.append(undefined as any)).toThrow(IllegalArgumentException);
    });	

	it("getComponent with valid expressions", () => {
		expect(n.getComponent(0)).toBe("oss");
		expect(n.getComponent(1)).toBe("fau");
		expect(n.getComponent(2)).toBe("de");
	});
	
	it("setComponent with valid expressions", () => {
		n.setComponent(0, "cs");
		expect(n.asString(".")).toBe("cs.fau.de");
	});

	it("insert with valid expressions", () => {
		n.insert(1, "cs");
		expect(n.asString(".")).toBe("oss.cs.fau.de");
	});

	it("remove with valid expressions", () => {
		n.remove(1);
		expect(n.asString(".")).toBe("oss.de");
	});

	it("append with valid expressions", () => {
		n.append("xyz");
		expect(n.asString(".")).toBe("oss.fau.de.xyz");
	});

});

describe("StringName Tests", () => {
	let n: Name;
	beforeEach(() => {
		n = new StringName("oss.fau.de");
	}); 

	it("constructor with null", () => {
		expect(() => new StringName(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("constructor with undefined", () => {
		expect(() => new StringName(undefined as any)).toThrow(IllegalArgumentException);
	});
	
	it("constructor with valid expressions", () => {
		expect(n.getNoComponents()).toBe(3);
		expect(n.asDataString()).toBe("oss.fau.de");
		expect(n.isEmpty()).toBe(false);
	});
	
	it("clone", () => {
		let clone = n.clone() as Name;
		expect(clone.getNoComponents()).toBe(3);
		expect(clone.asDataString()).toBe("oss.fau.de");
		expect(clone).not.toBe(n);
		expect(clone).toEqual(n);
	});
		
	it.each([
		{method: 'getComponent', action: () => n.getComponent(-1) },
		{method: 'setComponent', action: () => n.setComponent(-1, "cs") },
		{method: 'insert', action: () => n.insert(-1, "cs") },
		{method: 'remove', action: () => n.remove(-1) }
	])("negative Index should throw IllegalArgumentException", ({ action }) => {		
		expect(action).toThrow(IllegalArgumentException);
	});
	
	it.each([
			{method: 'getComponent', action: () => n.getComponent(5) },
			{method: 'setComponent', action: () => n.setComponent(5, "cs") },
			{method: 'insert', action: () => n.insert(5, "cs") },
			{method: 'remove', action: () => n.remove(5) }
		])("too high Index should throw IllegalArgumentException", ({ action }) => {		
			expect(action).toThrow(IllegalArgumentException);
	});
	
	it("manipulation methods with null component should throw IAE", () => {
	    expect(() => n.insert(0, null as any)).toThrow(IllegalArgumentException);
	    expect(() => n.setComponent(0, null as any)).toThrow(IllegalArgumentException);
	    expect(() => n.append(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("manipulation methods with undefined component should throw IAE", () => {
	    expect(() => n.insert(0, undefined as any)).toThrow(IllegalArgumentException);
	    expect(() => n.setComponent(0, undefined as any)).toThrow(IllegalArgumentException);
	    expect(() => n.append(undefined as any)).toThrow(IllegalArgumentException);
    });	

	it("getComponent with valid expressions", () => {
		expect(n.getComponent(0)).toBe("oss");
		expect(n.getComponent(1)).toBe("fau");
		expect(n.getComponent(2)).toBe("de");
	});
	
	it("setComponent with valid expressions", () => {
		n.setComponent(0, "cs");
		expect(n.asDataString()).toBe("cs.fau.de");
	});

	it("insert with valid expressions", () => {
		n.insert(1, "cs");
		expect(n.asDataString()).toBe("oss.cs.fau.de");
	});

	it("remove with valid expressions", () => {
		n.remove(1);
		expect(n.asDataString()).toBe("oss.de");
		n.remove(1);
		expect(n.asDataString()).toBe("oss");
		n.remove(0);
		expect(n.asDataString()).toBe("");
		expect(n.isEmpty()).toBe(true);
	});

	it("append with valid expressions", () => {
		n.append("xyz");
		expect(n.asDataString()).toBe("oss.fau.de.xyz");
	});

	it("escape, delimiter, masking", () => {
		n.append("cs.cip");
		expect(n.getNoComponents()).toBe(4);
		expect(n.getComponent(3)).toBe("cs.cip");
		expect(n.asDataString()).toBe("oss.fau.de.cs\\.cip");
	});


}); 

describe("Shared Methods from AbstractName Tests", () => {
    
    it("isEqual", () => {
        const n1 = new StringArrayName(["oss", "fau", "de"]);
        const n2 = new StringArrayName(["oss", "fau", "de"]);
        const n3 = new StringArrayName(["oss", "other"]);

        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.isEqual(n3)).toBe(false);
        expect(n1.getHashCode()).toBe(n2.getHashCode());
        expect(n1.getHashCode()).not.toBe(n3.getHashCode());
    });

    it("concat", () => {
        const n1 = new StringArrayName(["oss"]);
        const n2 = new StringArrayName(["fau", "de"]);

        n1.concat(n2); 
        
        expect(n1.asString(".")).toBe("oss.fau.de");
    });

    it("getHashCode", () => {
        const n1 = new StringArrayName(["oss", "fau", "de"]);
		const n2 = new StringName("oss.fau.de");
		
		const hashA = n1.getHashCode();
		const hashB = n1.getHashCode();

        expect(hashA).toBe(hashB); 
		expect(n2.getHashCode()).toBe(n1.getHashCode());        
    });
    
});
