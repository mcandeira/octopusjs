import { OctopusTree } from './OctopusTree.ts'
import { OctopusUtils } from '../OctopusUtils.ts'

import { OctopusMarkFor } from '../marks/OctopusMarkFamilyFOR.ts'

export class OctopusTreeFor extends OctopusTree {

    process(template: string, data: Record<string,any>): string
    {
        if(this.isOpenTree()){
            console.warn(OctopusUtils.constant.unclosedTree(this.root.name))
            return template.substring(this.root.start, this.closure.end)
        }

        const forRoot = this.root as OctopusMarkFor
        
        const [alias, , collectionName] = forRoot.iteration.split(' ')

        const list = OctopusUtils.function.resolveValue(collectionName?.trim(), data)
        
        if(!Array.isArray(list)) return ''

        const finalChunks: string[] = []
        const children = this.children

        for (const item of list) {
            
            const scopedData = { ...data, [alias.trim()]: item }

            const iterationChunks = []
            let cursor = this.root.end

            for (const child of children) {
                if (child instanceof OctopusTree) {
                    iterationChunks.push(template.substring(cursor, child.root.start))
                    iterationChunks.push(child.process(template, scopedData))
                    cursor = child.closure.end
                } else {
                    iterationChunks.push(template.substring(cursor, child.start))
                    cursor = child.end
                }
            }

            iterationChunks.push(template.substring(cursor, this.closure.start))

            finalChunks.push(OctopusUtils.function.interpolate(iterationChunks.join(''), scopedData))
        }

        return finalChunks.join('')
    }

}