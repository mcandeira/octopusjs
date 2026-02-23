export class OctopusEngine {

     static getTemplate(input:any){

        input = input.ref ?? input
    
        if(Array.isArray(input) && input.length === 2){

            let component = input[0].ref ?? input[0]

            if(component instanceof Element) component = component.innerHTML
            else if(typeof component === 'string'){}
            else throw new TypeError('[Octopus] Render Error: Invalid Template Argument')

            return this.stringToTemplate(this.processTemplate(component, input[1]))
        }

        if(input instanceof Element) return this.stringToTemplate(input.innerHTML)
    
        if(typeof input === 'string') return this.stringToTemplate(input)
    
        throw new TypeError('[Octopus] Render Error: Invalid Template Argument')
    }

    static #REGEX_SPACES = /\s+/
    static #REGEX_VARS = /\{\{([^}]+)\}\}/g

    static directives:any = {

        if(tag: any, data: any, string: any):any{
            const path = tag.contents[1]
            const condition = path ? path.split('.').reduce((o:any, i:any) => o?.[i], data) : false
            
            if(condition) {
                const innerTemplate = string.substring(tag.ending, tag.closeTag.starting)
                return this.processTemplate(innerTemplate, data)
            }
            return ''
        },

        for(tag: any, data: any, string: any):any{
            const path = tag.contents[3]
            const list = path ? path.split('.').reduce((o:any, i:any) => o?.[i], data) : null

            if(Array.isArray(list)){
                const innerTemplate = string.substring(tag.ending, tag.closeTag.starting)
                const varName = tag.contents[1]
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

    static processTemplate(string:any, data:any){
        const chunks = []
        let cursor = 0

        try {
            while(true){
                const tag:any = this.getPairedTags('8{', '}', string, cursor)
                
                if(!tag){if(cursor < string.length) chunks.push(string.substring(cursor)); break}

                chunks.push(string.substring(cursor, tag.starting))

                if(!tag.closeTag){
                    console.warn(`[Octopus] Template Warning: Unclosed or unknown tag '${tag.contents[0]}'`)
                    chunks.push(string.substring(tag.starting, tag.ending))
                    cursor = tag.ending
                    continue
                }

                const type = tag.contents[0]
                if(this.directives[type]) chunks.push(this.directives[type](tag, data, string))
                else chunks.push(string.substring(tag.starting, tag.closeTag.ending))

                cursor = tag.closeTag.ending
            }
        }catch(error:any){console.error(error); return `<div style="color:red; border:1px solid red; padding:10px;">Octopus Error: ${error.message}</div>`}

        const result = chunks.join('')

        return result.replace(this.#REGEX_VARS, (match, key) => {
            const value = key.trim().split('.').reduce((o:any, i:any) => o?.[i], data);
            
            return value ?? '';
        });
    }

    static getPairedTags(startDelimiter:any, endDelimiter:any, string:any, fromIndex= 0){

        let tag:any = this.getTag(startDelimiter, endDelimiter, string, fromIndex)
        if(!tag) return tag

        let typeTag = tag.contents[0]
        if(typeTag !== 'if' && typeTag !== 'for') return tag

        let nested = 0
        let searchFrom = tag.ending
        while(true){
            let nextTag = this.getTag(startDelimiter, endDelimiter, string, searchFrom)
            if(!nextTag) throw Error(`[Octopus] Template Syntax Error: Unclosed '${typeTag}' tag starting at index ${tag.starting}.`)

            searchFrom = nextTag.ending
            let typeNextTag = nextTag.contents[0]
            switch(typeNextTag){
                case 'if':
                case 'for':
                    nested++
                    break
                case 'endif':
                    if(nested > 0){nested--;continue}
                    if(typeTag !== 'if') throw Error(`[Octopus] Template Syntax Error: Unexpected 'endif' for '${typeTag}' tag.`)
                    tag.closeTag = nextTag
                    break
                case 'endfor':
                    if(nested > 0){nested--;continue}
                    if(typeTag !== 'for') throw Error(`[Octopus] Template Syntax Error: Unexpected 'endfor' for '${typeTag}' tag.`)
                    tag.closeTag = nextTag
                    break
            }
            if(tag.closeTag) break
        }

        return tag
    }

    static getTag(startDelimiter:any, endDelimiter:any, string:any, startingPosition = 0){
        const starting = string.indexOf(startDelimiter, startingPosition)
        if(starting < 0) return null

        const ending = string.indexOf(endDelimiter, starting)
        if(ending < 0) return null

        const contents = string.substring(starting + startDelimiter.length, ending).trim().split(this.#REGEX_SPACES)
        if(contents.length < 1 || contents[0] === "") return null

        return {'contents': contents, 'starting': starting, 'ending': ending + endDelimiter.length}
    }

    static stringToTemplate(string:any){
        let template = document.createElement('template')
        template.innerHTML = string
        this.fixScripts(template)
        return template
    }

    static fixScripts(template:any){
        const content = template.content

        for(const innerTemplate of content.querySelectorAll('template')) this.fixScripts(innerTemplate)

        for(const script of content.querySelectorAll('script')){
            const workingScript = document.createElement('script')
            Array.from(script.attributes).forEach((attr:any) => workingScript.setAttribute(attr.name, attr.value))
            workingScript.type = 'module'
            workingScript.textContent = script.textContent
            script.replaceWith(workingScript)
        }
    }

}