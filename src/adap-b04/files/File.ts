import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

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

        if (this.state !== FileState.OPEN) {
            throw new IllegalArgumentException("Cannot read from a closed or deleted file.");
        }

        return new Int8Array();
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

