import { OctopusTree } from './OctopusTree'
import * as Marks from '../marks'
//import { OctopusUtils } from '../OctopusUtils'

export class OctopusTreeRoot extends OctopusTree {

    constructor(){
        super(new Marks.OctopusMarkRoot())
    }

    process(data?: Record<string,any>): string
    {
        // const template = OctopusTree.template
        // data = data ?? OctopusTree.data

        // const children = this.children
        // if(children.length === 1) return template

        // const chunks = []
        // let cursor = 0
        // for(const child of children){
        //     if(child instanceof OctopusTree){
        //         chunks.push(template.substring(cursor, child.root.start))
        //         chunks.push(child.process(data))
        //         cursor = child.closure.end
        //     } else{
        //         chunks.push(template.substring(cursor, child.start))
        //         cursor = child.end
        //     }
        // }
        // chunks.push(template.substring(cursor))

        // const result = chunks.join('').replace(OctopusTreesUtils.REGEX_VARS, (match, key) => {
        //     const value = data[key.trim()]
        //     return value !== undefined ? OctopusTreesUtils.escapeHTML(String(value)) : ''
        // })

        // return result
        return ''
    }

}