import { OctopusTree } from './OctopusTree'
//import { OctopusUtils } from '../OctopusUtils'

//import * as Marks from '../marks/OctopusMark'

export class OctopusTreeFor extends OctopusTree {

    process(data?: Record<string,any>): string
    {
        // const input = OctopusTree.template
        // data = data ?? OctopusTree.data
        
        // const forRoot = this.root as Marks.OctopusMarkFor;
        // const list = OctopusTreesUtils.resolveValue(forRoot.collection, data)

        // if(!Array.isArray(list)) return ''

        // const chunks: string[] = []

        // for (const item of list) {
        //     const scopedData = { ...data, [forRoot.element]: item }

        //     let cursor = forRoot.end
        //     for (const child of this.children) {
        //         const isTree = child instanceof OctopusTree
        //         const nextMark = isTree ? child.root : child
        //         const lastMark = isTree ? child.closure : child

        //         chunks.push(input.substring(cursor, nextMark.start))


        //         if (isTree) {
        //             chunks.push(child.process(scopedData))
        //         }
                
        //         cursor = lastMark.end
        //     }

        //     const finalChunk = input.substring(cursor, this.closure.start)
        //     chunks.push(this.replaceVars(finalChunk, scopedData))
        // }

        // return chunks.join('')
        return ''
    }

    // private replaceVars(html: string, data: Record<string, any>): string {
    //     return html.replace(OctopusTreesUtils.REGEX_VARS, ([], key) => {
    //         const value = OctopusTreesUtils.resolveValue(key.trim(), data);
    //         return value !== undefined ? OctopusTreesUtils.escapeHTML(String(value)) : '';
    //     });
    // }
}