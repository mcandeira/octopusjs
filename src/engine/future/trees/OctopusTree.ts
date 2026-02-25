import { Marks } from '../marks/index'

export abstract class OctopusTree {

    cacheable: boolean = true

    root: Marks.OctopusMark
    closure: Marks.OctopusMark

    contentStart: number
    textContent: string|undefined

    children: Array<OctopusTree|Marks.OctopusMark> = []

    constructor(root: Marks.OctopusMark){
        this.root = root
        this.children.push(root)
        this.closure = root
        this.contentStart = root.end
    }

    addChild(child: OctopusTree|Marks.OctopusMark): void
    {
        const relative = this.contentStart

        if(relative){
            const childMark = child instanceof OctopusTree ? child.root : child
            childMark.start -= relative
            childMark.end -= relative
        }

        this.children.push(child)
    }

    addClosure(mark: Marks.OctopusMark)
    {
        this.addChild(mark)
        this.closure = mark
    }

    pop(): OctopusTree|Marks.OctopusMark|undefined
    {
        return this.children.pop()
    }

    abstract process(data: Record<string, any>): string

}