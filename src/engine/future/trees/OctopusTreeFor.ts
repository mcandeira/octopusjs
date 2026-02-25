import { OctopusTree } from './OctopusTree'
import { OctopusTreeUtils } from './OctopusTreesUtils'

import * as Marks from '../marks/OctopusMarks'
import * as Capsule from '../capsules/OctopusCapsules'

export class OctopusTreeFor extends OctopusTree {

    resolve(capsule: Capsule.OctopusDataCapsule): Capsule.OctopusStringCapsule
    {
        const input = capsule.content
        const data = capsule.data
        
        const forRoot = this.root as Marks.OctopusMarkFor;
        const list = OctopusTreeUtils.resolveValue(forRoot.collection, data)

        if(!Array.isArray(list)) return new Capsule.OctopusStringCapsule('', false)

        const chunks: string[] = []

        for (const item of list) {
            const scopedData = { ...data, [forRoot.element]: item }

            let cursor = forRoot.end
            for (const child of this.children) {
                const isTree = child instanceof OctopusTree
                const nextMark = isTree ? child.root : child
                const lastMark = isTree ? child.closure : child

                chunks.push(input.substring(cursor, nextMark.start))


                if (isTree) {
                    chunks.push(child.process(scopedData).content)
                }
                
                cursor = lastMark.end
            }

            const finalChunk = input.substring(cursor, this.closure.start)
            chunks.push(this.replaceVars(finalChunk, scopedData))
        }

        return new Capsule.OctopusStringCapsule(chunks.join(''), capsule.cacheable)
    }

    private replaceVars(html: string, data: Record<string, any>): string {
        return html.replace(OctopusTreeUtils.REGEX_VARS, ([], key) => {
            const value = OctopusTreeUtils.resolveValue(key.trim(), data);
            return value !== undefined ? OctopusTreeUtils.escapeHTML(String(value)) : '';
        });
    }
}