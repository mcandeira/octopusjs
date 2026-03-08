import { OctopusMark } from '../marks/OctopusMark.ts'

export abstract class OctopusTree {

    root: OctopusMark
    closure: OctopusMark

    children: Array<OctopusMark|OctopusTree> = []

    constructor(root: OctopusMark)
    {
        this.root = this.closure = root
    }

    addChild(child: OctopusMark|OctopusTree): void
    {
        this.children.push(child)
    }

    isOpenTree(): boolean
    {
        return this.root === this.closure
    }

    abstract process(template: string, data: Record<string,any>): string

}