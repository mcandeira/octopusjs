import { OctopusTree } from './OctopusTree'
import { Marks } from '../marks/index'
import { Capsules } from '../capsules/index'
import { OctopusTreesUtils } from './OctopusTreesUtils'

export class OctopusTreeRoot extends OctopusTree {

    constructor(textContent: string){
        super(new Marks.OctopusMarkRoot())
        this.textContent = textContent
    }

    resolve(capsule: Capsules.OctopusDataCapsule): Capsules.OctopusStringCapsule
    {
        const template = capsule.content
        const data = capsule.data

        const children = this.children
        if(children.length === 1) return new Capsules.OctopusStringCapsule(template, capsule.cacheable)

        const chunks = []
        let cursor = 0
        for(const child of children){
            if(child instanceof OctopusTree){
                chunks.push(template.substring(cursor, child.root.start))
                chunks.push(child.process(data).content)
                cursor = child.closure.end
            } else{
                chunks.push(template.substring(cursor, child.start))
                cursor = child.end
            }
        }
        chunks.push(template.substring(cursor))

        const result = chunks.join('').replace(OctopusTreesUtils.REGEX_VARS, (match, key) => {
            const value = data[key.trim()]
            return value !== undefined ? OctopusTreesUtils.escapeHTML(String(value)) : ''
        })

        return new Capsules.OctopusStringCapsule(result, capsule.cacheable)
    }

}

export class OctopusTreeInvalid extends OctopusTree {

    resolve(capsule: Capsules.OctopusDataCapsule): Capsules.OctopusStringCapsule
    {
        return new Capsules.OctopusStringCapsule('', false)
    }
    
}