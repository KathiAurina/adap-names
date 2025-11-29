import { describe, it, expect, beforeEach } from "vitest";
import { File } from "../../../src/adap-b04/files/File";
import { Directory } from "../../../src/adap-b04/files/Directory";
import { RootNode } from "../../../src/adap-b04/files/RootNode";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";

describe("File Contract Tests", () => {
    let root: RootNode;
    let dir: Directory;
    let file: File;

    beforeEach(() => {
        root = new RootNode();
        dir = new Directory("usr", root);
        file = new File("testfile", dir);
    });

    it("open() works on CLOSED file", () => {        
        file.open(); 
        expect(() => file.read(1)).not.toThrow();
    });

    it("open() throws IAE if file is already OPEN", () => {
        file.open(); 
        expect(() => file.open()).toThrow(IllegalArgumentException);
    });

    it("read() throws IAE if file is CLOSED", () => {
        expect(() => file.read(1)).toThrow(IllegalArgumentException);
    });

    it("close() throws IAE if file is CLOSED", () => {
        expect(() => file.close()).toThrow(IllegalArgumentException);
    });

    it("close() works on OPEN file", () => {
        file.open();
        file.close(); 
        expect(() => file.read(1)).toThrow(IllegalArgumentException);
    });
});
