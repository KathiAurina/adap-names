import { Node } from "./Node";
import { ServiceFailureException} from "../common/ServiceFailureException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public findNodes(bn: string): Set<Node> {
        const results: Set<Node> = super.findNodes(bn);

        for (const child of this.childNodes) {
            try {
                const childResults = child.findNodes(bn);
                childResults.forEach((foundNode) => results.add(foundNode));
            } catch (e) {
                if (e instanceof ServiceFailureException) {
                    throw e;
                }
                throw new ServiceFailureException("Unknown error in child node search");
            }
        }
        return results;
    }

}