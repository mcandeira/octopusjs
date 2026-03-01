import { OctopusTree, OctopusTreeRoot } from './trees'
import { OctopusUtils } from './OctopusUtils'
import { OctopusMarksFactory as MarksFactory} from './factories/OctopusMarksFactory'
import { OctopusMarkInvalid } from './marks'

export class OctopusParser {

    static generateOctopusTree(template: string, data: Record<string,any>): OctopusTree
    {
        OctopusTree.template = template
        OctopusTree.data = data

        const startDelimiter = OctopusUtils.constant.startDelimiter
        const startDelimiterLength = startDelimiter.length

        const endDelimiter = OctopusUtils.constant.endDelimiter
        const endDelimiterLength = endDelimiter.length

        const octopusRootTree = new OctopusTreeRoot()

        let cursor = 0
        while(true)
        {
            const starting = template.indexOf(startDelimiter, cursor)
            if(starting < 0) break

            const ending = cursor = template.indexOf(endDelimiter, starting)

            const mark = MarksFactory.createMark(starting, ending + endDelimiterLength, template.substring(starting + startDelimiterLength, ending))

            if(mark instanceof OctopusMarkInvalid){
                console.warn(OctopusUtils.constant.unknownMark(mark.constructor.name))
                continue
            }

            octopusRootTree.addChild(mark)
        }

        return octopusRootTree
    }

}