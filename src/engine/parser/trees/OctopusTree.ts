import { OctopusMark, OctopusMarkInvalid } from '../marks'
import { MarkType, OctopusUtils } from '../OctopusUtils'
import { OctopusTreesFactory as TreesFactory} from '../factories/OctopusTreesFactory'

export abstract class OctopusTree {

    static template: string
    static data: Record<string,any>

    abstract process(data?: Record<string,any>): string

    root: OctopusMark
    closure: OctopusMark

    children: Array<OctopusMark|OctopusTree> = []
    lastChild: OctopusMark|OctopusTree

    constructor(root: OctopusMark)
    {
        this.children.push(root)
        this.root = this.closure = this.lastChild = root
    }

    isOpenTree(): boolean
    {
        return this.root === this.closure
    }

    addChild(child: OctopusMark): boolean|undefined
    {
        const lastChild = this.lastChild

        if(lastChild instanceof OctopusTree && lastChild.isOpenTree())
        {
            const result = lastChild.addChild(child)
            if(result !== undefined) return result
        }

        switch(child.type)
        {
            case MarkType.open: return this.openTree(child)

            case MarkType.close: return this.closeTree(child)

            default: return this.addMark(child)
        }
    }

/* =====================================================================
    INSTANCE PRIVATE METHODS
   ===================================================================== */

    private openTree(mark: OctopusMark): true
    {
        const tree = TreesFactory.createTree(mark)
        
        this.pushChild(tree)
        return true
    }

    private closeTree(mark: OctopusMark): boolean|undefined
    {
        if(Object.getPrototypeOf(mark.constructor) !== Object.getPrototypeOf(this.root.constructor)) return undefined

        this.pushChild(mark)
        this.closure = mark
        return true
    }

    private addMark(mark: OctopusMark): boolean
    {
        if(mark instanceof OctopusMarkInvalid) return false
        this.pushChild(mark)
        return true
    }

    private pushChild(child: OctopusMark|OctopusTree): void
    {
        this.children.push(child)
        this.lastChild = child
    }

}