import { OctopusTree } from './OctopusTree'
import { OctopusTreesUtils } from './OctopusTreesUtils'

import * as Marks from '../marks/OctopusMarks'
import * as Capsule from '../capsules/OctopusCapsules'

export class OctopusTreeIf extends OctopusTree {

    conditions: Array<{path: string, source: {mark: Marks.OctopusMark, childPosition: number}}> = []

    constructor(root: Marks.OctopusMarkIf){
        super(root)
        this.conditions.push({path: root.condition, source: {mark: root, childPosition: 0}})
    }

    addChild(child: OctopusTree|Marks.OctopusMark): void
    {
        super.addChild(child)
        if(child instanceof Marks.OctopusMarkElseIf || child instanceof Marks.OctopusMarkElse)
        {
            this.conditions.push({path: child.condition, source: {mark: child, childPosition: this.children.length - 1}})
        }
    }

    resolve(capsule: Capsule.OctopusDataCapsule): Capsule.OctopusStringCapsule
    {
        const template = capsule.content
        const data = capsule.data

        const root = this.root as Marks.OctopusMarkIf
        const closure = this.closure

        if(root === closure) return new Capsule.OctopusStringCapsule('', capsule.cacheable)

        const children = this.children

        const rootSource =  {mark: root as Marks.OctopusMark, childPosition: -1}
        const closureSource = {mark: closure, childPosition: children.length -1}

        let startMark = rootSource
        let endMark = closureSource

        const conditions = this.conditions
        const conditionsLength = conditions.length

        let condition = false

        for(let i = 0; i < conditionsLength; i++){
            const currentCondition = conditions[i]
            const nextCondition = i < conditionsLength - 1 ? conditions[i+1] : null

            startMark = currentCondition.source
            endMark = nextCondition?.source ?? closureSource

            const pathCondition = currentCondition.path
            const resolved = pathCondition !== 'else' ? OctopusTreesUtils.resolveValue(pathCondition, data) : true
            if(resolved){condition = true; break}
        }

        if(!condition) return new Capsule.OctopusStringCapsule('', capsule.cacheable)

        const chunks = []
        const from = startMark.childPosition + 1
        const until = endMark.childPosition
        
        let cursor = 0
        for(let i = from; i < until; i++){

            const child = children[i]
            if(child instanceof OctopusTree){
                chunks.push(template.substring(cursor, child.root.start))
                chunks.push(child.process(new Capsule.OctopusDataCapsule(template.substring(child.root.end, child.closure.start), data)))
                cursor = child.closure.end
            } else {
                chunks.push(template.substring(cursor, child.start))
                cursor = child.end
            }

        }
        chunks.push(template.substring(cursor, endMark.mark.start))

        const result = chunks.join('').replace(OctopusTreesUtils.REGEX_VARS, ([], key) => {
            const value = OctopusTreesUtils.resolveValue(key.trim(), data)
            return value !== undefined ? OctopusTreesUtils.escapeHTML(String(value)) : ''
        })

        return new Capsule.OctopusStringCapsule(result, capsule.cacheable)
    }

}