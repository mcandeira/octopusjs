import { OctopusTree } from './OctopusTree.ts'
import { OctopusMarkRoot } from '../marks/OctopusMarkRoot.ts'
import { OctopusUtils } from '../OctopusUtils.ts'

export class OctopusTreeRoot extends OctopusTree {

    constructor(){
        super(new OctopusMarkRoot())
    }

    process(template: string, data: Record<string,any>): string
    {
        const children = this.children

        const chunks = []
        let cursor = 0

        for(const child of children){
            if(child instanceof OctopusTree){
                chunks.push(template.substring(cursor, child.root.start))
                chunks.push(child.process(template, data))
                cursor = child.closure.end
            }else{
                chunks.push(template.substring(cursor, child.start))
                cursor = child.end
            }
        }
        chunks.push(template.substring(cursor))

        return OctopusUtils.function.interpolate(chunks.join(''), data)
    }

}