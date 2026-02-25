import { OctopusStringCapsule } from '../capsules/OctopusCapsules'
import { OctopusTree, OctopusTreeRoot, OctopusTreeInvalid, TreesFactory} from '../trees/index'
import { OctopusConstants } from '../../utils/OctopusConstants'
import { Marks, MarksFactory } from '../marks/index'
import { MarkType } from '../../utils/OctopusTypes'

export class OctopusParser {

    static generateOctopusTree(capsule: OctopusStringCapsule): OctopusTree
    {
        const template = capsule.content

        const startDelimiter = OctopusConstants.engine.eyes.startDelimiter
        const startDelimiterLength = startDelimiter.length

        const endDelimiter = OctopusConstants.engine.eyes.endDelimiter
        const endDelimiterLength = endDelimiter.length

        const octopusRootTree = new OctopusTreeRoot(template)

        const currentTreeLevels = [octopusRootTree as OctopusTree]
        let currentLevel = 0

        let cacheable = true

        let cursor = 0
        while(true)
        {
            const starting = cursor = template.indexOf(startDelimiter, cursor)
            if(cursor < 0) break

            const ending = cursor = template.indexOf(endDelimiter, cursor)
            if(cursor < 0)
            {
                console.warn(OctopusConstants.engine.eyes.incompleteTag, currentTreeLevels)
                cacheable = false
                break
            }

            const mark = MarksFactory.createMark(starting, ending + endDelimiterLength, template.substring(starting + startDelimiterLength, ending))

            const markType = mark.type
            const parentTree = currentTreeLevels[currentLevel]

            if(mark instanceof Marks.OctopusMarkInvalid){
                console.warn(OctopusConstants.engine.eyes.undefinedTag, currentTreeLevels, mark)
                cacheable = false
                continue
            }

            if(markType === MarkType.open)
            {
                const tree = TreesFactory.createTree(mark)

                if(tree instanceof OctopusTreeInvalid){
                    console.warn(OctopusConstants.engine.eyes.undefinedTree, currentTreeLevels, tree)
                    cacheable = false
                    continue
                }
                
                parentTree.addChild(tree)
                currentTreeLevels.push(tree)
                currentLevel++
                continue
            }
            
            if(markType === MarkType.close){

                if(Object.getPrototypeOf(mark.constructor) === Object.getPrototypeOf(parentTree.root.constructor))
                {
                    parentTree.textContent = template.substring(parentTree.contentStart, mark.start)
                    parentTree.addClosure(mark as Marks.OctopusMark)
                    currentLevel--
                    currentTreeLevels.pop()
                    continue
                }
                
                if(currentLevel > 0)
                {
                    const grandParentTree = currentTreeLevels[currentLevel - 1]
                    if(Object.getPrototypeOf(mark.constructor) === Object.getPrototypeOf(grandParentTree.root.constructor))
                    {
                        grandParentTree.pop()
                        grandParentTree.textContent = template.substring(grandParentTree.contentStart, mark.start)
                        grandParentTree.addClosure(mark as Marks.OctopusMark)

                        console.warn(OctopusConstants.engine.eyes.unclosedTag, currentTreeLevels)
                        cacheable = false

                        currentLevel -= 2
                        currentTreeLevels.pop()
                        currentTreeLevels.pop()
                        continue
                    }
                    console.warn(OctopusConstants.engine.eyes.unclosedTag, currentTreeLevels, mark)
                    cacheable = false
                    continue
                }
                console.warn(OctopusConstants.engine.eyes.unopenedTag, currentTreeLevels, mark)
                cacheable = false
                continue
            }
            parentTree.addChild(mark)
        }

        if(currentLevel > 0)
        {
            console.warn(OctopusConstants.engine.eyes.unclosedTag, currentTreeLevels)
            cacheable = false
            octopusRootTree.pop()
        }

        octopusRootTree.cacheable = cacheable

        return octopusRootTree
    }

}