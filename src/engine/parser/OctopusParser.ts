import { OctopusCache } from '../OctopusCache.ts'
import { OctopusTree } from './trees/OctopusTree.ts'
import { OctopusUtils, MarkType } from './OctopusUtils.ts'
import { OctopusTreeAssembler } from './trees/OctopusTreeAssembler.ts'
import { OctopusMarksFactory as MarksFactory} from './factories/OctopusMarksFactory.ts'

export class OctopusParser {

    static readonly cache: OctopusCache = new OctopusCache()

    static generateOctopusTree(template: string): OctopusTree
    {
        return this.cache.process(template, (template: string): OctopusTree => this.buildTree(template))
    }

    private static buildTree(template: string): OctopusTree
    {
        const startDelimiter = OctopusUtils.constant.startDelimiter
        const startDelimiterLength = startDelimiter.length

        const endDelimiter = OctopusUtils.constant.endDelimiter
        const endDelimiterLength = endDelimiter.length

        const treeAssembler = new OctopusTreeAssembler()

        let cursor = 0
        while(true)
        {
            const starting = template.indexOf(startDelimiter, cursor)
            if(starting < 0) break

            const ending = cursor = template.indexOf(endDelimiter, starting)
            if(ending < 1){console.warn(OctopusUtils.constant.lastUnclosedMark()); break}

            const mark = MarksFactory.createMark(starting, ending + endDelimiterLength, template.substring(starting + startDelimiterLength, ending))

            switch(mark.type)
            {
                case MarkType.open: treeAssembler.openTree(mark); break

                case MarkType.close: treeAssembler.closeTree(mark); break
                    
                default: treeAssembler.addMark(mark)
            }
        }
        return treeAssembler.getTree()
    }

}