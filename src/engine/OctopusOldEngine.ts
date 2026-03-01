import { OctopusFragments } from './OctopusFragments'
import { OctopusTag } from './parser/factories/OctopusTagsFactory'
import { OctopusPerformance } from './OctopusPerformance'
import { OctopusUtils } from './parser/OctopusUtils'
import { OctopusTagsFactory as TagsFactory } from './parser/factories/OctopusTagsFactory'

import type { Input, Position } from '../periferics/OctopusUtils'

export class OctopusEngine {

    static render(input: Input, position: Position, relative: Element): void
    {
        const processedInput = this.process(input)

        switch(position){
            case 'beforebegin': relative.before(processedInput); break
            case 'afterbegin': relative.prepend(processedInput); break
            case 'beforeend': relative.append(processedInput); break
            case 'afterend': relative.after(processedInput); break
            case 'into': relative.replaceChildren(processedInput); break
            default: relative.appendChild(processedInput); break
        }
    }

    static process(input:any){

        input = input.ref ?? input
    
        if(Array.isArray(input) && input.length === 2){

            let component = input[0].ref ?? input[0]

            if(component instanceof Element) component = component.innerHTML
            else if(typeof component === 'string'){}
            else throw new TypeError('[Octopus] Render Error: Invalid Template Argument')

            const processedTemplate = this.processTemplate(component, input[1])

            const fragment = OctopusFragments.stringToFragment(processedTemplate)

            return fragment
        }

        if(input instanceof Element) return OctopusFragments.stringToFragment(input.innerHTML)
    
        if(typeof input === 'string') return OctopusFragments.stringToFragment(input)
    
        throw new TypeError('[Octopus] Render Error: Invalid Template Argument')
    }

    static processTemplate(template: string, data:any){

        const chunks = []
        let cursor = 0
        while(true){
            const mark = this.getPairedMarks(template, cursor)
            
            if(!mark){if(cursor < template.length) chunks.push(template.substring(cursor)); break}

            chunks.push(template.substring(cursor, mark.start))

            if(!mark.closeTag){
                console.warn(`[Octopus] Template Warning: Unclosed or unknown mark '${mark.headers[0]}'`)
                chunks.push(template.substring(mark.start, mark.end))
                cursor = mark.end
                continue
            }

            const type = mark.headers[0]
            if(this.directives[type]) chunks.push(this.directives[type](mark, data, template))
            else chunks.push(template.substring(mark.start, mark.closeTag.end))

            cursor = mark.closeTag.end
        }

        const result = chunks.join('')

        return result.replace(this.#REGEX_VARS, ([], key) => {
            const value = key.trim().split('.').reduce((o:any, i:any) => o?.[i], data);
            
            return value ?? '';
        });
    }

    static #REGEX_VARS = /\{\{([^}]+)\}\}/g

    static directives:any = {

        if(mark: OctopusTag, data: any, string: any):any{
            const path = mark.headers[1]
            const condition = path ? path.split('.').reduce((o:any, i:any) => o?.[i], data) : false
            
            if(condition) {
                const innerTemplate = string.substring(mark.end, mark.closeTag?.start)
                return OctopusEngine.processTemplate(innerTemplate, data)
            }
            return ''
        },

        for(mark: OctopusTag, data: any, string: any):any{
            const path = mark.headers[3]
            const list = path ? path.split('.').reduce((o:any, i:any) => o?.[i], data) : null

            if(Array.isArray(list)){
                const innerTemplate = string.substring(mark.end, mark.closeTag?.start)
                const varName = mark.headers[1]
                const chunks = []

                for(let element of list){
                    let forData = Object.create(data)
                    forData[varName] = element
                    chunks.push(OctopusEngine.processTemplate(innerTemplate, forData))
                }
                return chunks.join('')
            }
            return ''
        }

    }

    static getPairedMarks(string: string, cursor = 0): OctopusTag|undefined
    {
        let mark = this.getMark(string, cursor)
        if(!mark) return undefined

        let typeTag = mark.headers[0]
        if(typeTag !== 'if' && typeTag !== 'for') return mark

        let nested = 0
        let searchFrom = mark.end
        while(true){
            let nextMark = this.getMark(string, searchFrom)
            if(!nextMark) throw Error(`[Octopus] Template Syntax Error: Unclosed '${typeTag}' mark starting at index ${mark.start}.`)

            searchFrom = nextMark.end
            let typeNextTag = nextMark.headers[0]
            switch(typeNextTag){
                case 'if':
                case 'for':
                    nested++
                    break
                case 'endif':
                    if(nested > 0){nested--;continue}
                    if(typeTag !== 'if') throw Error(`[Octopus] Template Syntax Error: Unexpected 'endif' for '${typeTag}' mark.`)
                    mark.closeTag = nextMark
                    break
                case 'endfor':
                    if(nested > 0){nested--;continue}
                    if(typeTag !== 'for') throw Error(`[Octopus] Template Syntax Error: Unexpected 'endfor' for '${typeTag}' mark.`)
                    mark.closeTag = nextMark
                    break
            }
            if(mark.closeTag) break
        }

        return mark
    }

    static #REGEX_SPACES = /\s+/

    static getMark(template: string, cursor = 0): OctopusTag|undefined
    {
        const startDelimiter = OctopusUtils.constant.startDelimiter
        const startDelimiterLength = startDelimiter.length

        const endDelimiter = OctopusUtils.constant.endDelimiter
        const endDelimiterLength = endDelimiter.length

        const starting = template.indexOf(startDelimiter, cursor)
        if(starting < 0) return undefined

        const ending = template.indexOf(endDelimiter, starting)
        if(ending < 0) return undefined

        const contents = template.substring(starting + startDelimiterLength, ending).trim().split(this.#REGEX_SPACES)
        if(contents.length < 1 || contents[0] === "") return undefined

        return TagsFactory.createTag(starting, ending + endDelimiterLength, contents)
    }

}