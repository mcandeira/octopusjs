import { OctopusTree } from './OctopusTree.ts'
import { OctopusMark } from '../marks/OctopusMark.ts'
import { OctopusTreesFactory as TreesFactory} from '../factories/OctopusTreesFactory.ts'
import { OctopusTreeRoot } from './OctopusTreeRoot.ts'
import { OctopusMarkInvalid } from '../marks/OctopusMarkInvalid.ts'
import { OctopusUtils } from '../OctopusUtils.ts'

export class OctopusTreeAssembler {

    private stack: OctopusTree[] = []

    constructor()
    {
        this.stack.push(new OctopusTreeRoot())
    }

    openTree(mark: OctopusMark): void
    {
        const currentTree = this.stack[this.stack.length - 1]
        const newTree = TreesFactory.createTree(mark)

        currentTree.addChild(newTree)
        this.stack.push(newTree)
    }

    closeTree(mark: OctopusMark): void
    {
        const stack = this.stack
        const stackLength = stack.length

        for(let i = stackLength - 1; i >= 0; i--)
        {
            const currentTree = stack[i]

            if(Object.getPrototypeOf(currentTree.root.constructor) !== Object.getPrototypeOf(mark.constructor)) continue
            
            currentTree.closure = mark
            this.stack.length = i
            return
        }

        console.warn(OctopusUtils.constant.unopenedMark(mark.name))
    }

    addMark(mark: OctopusMark): void
    {
        if(mark instanceof OctopusMarkInvalid){console.warn(OctopusUtils.constant.invalidMark(mark.name)); return}

        const currentTree = this.stack[this.stack.length - 1]

        currentTree.addChild(mark)
    }

    getTree(): OctopusTree
    {
        return this.stack[0]
    }

}