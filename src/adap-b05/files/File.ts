import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import {IllegalArgumentException} from "../../adap-b04/common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        if (this.state !== FileState.CLOSED) {
            throw new IllegalArgumentException("Can only open a closed file.");
        }

        this.state = FileState.OPEN;
    }

    public read(noBytes: number): Int8Array {
        let result: Int8Array = new Int8Array(noBytes);

        if (this.state !== FileState.OPEN) {
            throw new IllegalArgumentException("Cannot read from a closed or deleted file.");
        }

        let tries: number = 0;
        for (let i: number = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
                tries = 0;
            } catch(ex) {
                tries++;
                if (ex instanceof MethodFailedException) {
                    if (tries < 3) {
                        i--; // retry this byte
                    } else {
                        throw new MethodFailedException("Failed to read byte after 3 attempts.");
                    }
                } else {
                    throw ex; // rethrow all other exceptions
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        return 0; // @todo
    }

    public close(): void {
        if (this.state !== FileState.OPEN) {
            throw new IllegalArgumentException("Can only close an open file.");
        }

        this.state = FileState.CLOSED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}