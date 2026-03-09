import { OctopusTree } from './OctopusTree.ts'
import { OctopusUtils } from '../OctopusUtils.ts'

import { OctopusMarkIF, OctopusMarkElse } from '../marks/OctopusMarkFamilyIF.ts'

export class OctopusTreeIf extends OctopusTree {

    process(template: string, data: Record<string,any>): string
    {
        if(this.isOpenTree()){
            console.warn(OctopusUtils.constant.unclosedTree(this.root.name))
            return template.substring(this.root.start, this.closure.end)
        }

        const children = [this.root, ...this.children, this.closure]

        const chunks = []
        let match = false
        let cursor = 0

        for(const child of children){

            if(child instanceof OctopusMarkIF){

                if(match){chunks.push(template.substring(cursor, child.start)); break}

                match = child instanceof OctopusMarkElse ? true : OctopusUtils.function.evaluateCondition(child.condition, data)

                if(match) cursor = child.end 

                continue 
            }

            if(!match) continue

            if(child instanceof OctopusTree){
                chunks.push(template.substring(cursor, child.root.start))
                chunks.push(child.process(template, data))
                cursor = child.closure.end
            } else {
                chunks.push(template.substring(cursor, child.start))
                cursor = child.end
            }
        }
        return OctopusUtils.function.interpolate(chunks.join(''), data)
    }

}