import { describe, it, expect, beforeEach } from "vitest";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";

import { IllegalArgumentException } from "../../../src/adap-b04/common";
import { InvalidStateException } from "../../../src/adap-b04/common";
import { MethodFailedException } from "../../../src/adap-b04/common";
//Todos 
//StringArrayName: 
//constructor(source, delim) -> source = null || undefined || was valides
//clone ob gleiches bei raus kommt
//asString(delim) -> delim = 0 || undefined || was valides
//getComponent(i) -> i < 0 || i >= comps.length || i von null(bzw undefined) comp || was valides
//setComponent(i, c) ->
//insert
//append
//remove
//checkMasking

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
		let clone = n.clone();
		expect(clone.getNoComponents()).toBe(3);
		expect(clone.asString(".")).toBe("oss.fau.de");
		expect(clone).not.toBe(n);
		expect(clone).toEqual(n);
	});
	
	it("asString with delimiter null", () => {
		expect(() => n.asString(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("asString with delimiter undefined", () => {
		expect(() => n.asString(undefined as any)).toThrow(IllegalArgumentException);
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

}); 

