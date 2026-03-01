import { OctopusTree } from './OctopusTree'
//import { OctopusUtils } from '../OctopusUtils'

//import * as Marks from '../marks'

export class OctopusTreeIf extends OctopusTree {

    process(data?: Record<string,any>): string
    {
        // const template = OctopusTree.template
        // data = OctopusTree.data

        // const root = this.root as Marks.OctopusMarkIf
        // const closure = this.closure

        // if(root === closure) return ''

        // const children = this.children

        // const rootSource =  {mark: root as Marks.OctopusMark, childPosition: -1}
        // const closureSource = {mark: closure, childPosition: children.length -1}

        // let startMark = rootSource
        // let endMark = closureSource

        // const conditions = this.conditions
        // const conditionsLength = conditions.length

        // let condition = false

        // for(let i = 0; i < conditionsLength; i++){
        //     const currentCondition = conditions[i]
        //     const nextCondition = i < conditionsLength - 1 ? conditions[i+1] : null

        //     startMark = currentCondition.source
        //     endMark = nextCondition?.source ?? closureSource

        //     const pathCondition = currentCondition.path
        //     const resolved = pathCondition !== 'else' ? OctopusTreesUtils.resolveValue(pathCondition, data) : true
        //     if(resolved){condition = true; break}
        // }

        // if(!condition) return ''

        // const chunks = []
        // const from = startMark.childPosition + 1
        // const until = endMark.childPosition
        
        // let cursor = 0
        // for(let i = from; i < until; i++){

        //     const child = children[i]
        //     if(child instanceof OctopusTree){
        //         chunks.push(template.substring(cursor, child.root.start))
        //         chunks.push(child.process())
        //         cursor = child.closure.end
        //     } else {
        //         chunks.push(template.substring(cursor, child.start))
        //         cursor = child.end
        //     }

        // }
        // chunks.push(template.substring(cursor, endMark.mark.start))

        // const result = chunks.join('').replace(OctopusTreesUtils.REGEX_VARS, ([], key) => {
        //     const value = OctopusTreesUtils.resolveValue(key.trim(), data)
        //     return value !== undefined ? OctopusTreesUtils.escapeHTML(String(value)) : ''
        // })

        // return result
        return ''
    }

}