/**
 * OctopusJS | v1.1.4 "Abyssal Octopus" 🐙 
 * ------------------------------------
 * High-performance distributed intelligence frontend development framework.
 * * @author Miguel Candeira Carrera
 * @license MIT
 * @see {@link https://github.com/mcandeira/octopusjs}
 * @release Supervised and improved with the invaluable assistance of Gemini (Google AI).
 * * Characteristics:
 * - 12kB footprint (~3.8kB Gzipped)
 * - 0.07s LCP | 0.02s CLS
 * - Native ESM Architecture
 * * Copyright (c) 2026 Miguel Candeira Carrera
 * * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * -----------------------------------------------------
 */

const octopusScripts = Array.from(document.querySelectorAll('script.octopus')).reverse()

export class octopus {

    /**
     * Factory method to instantiate an OctopusComponent object.
     * @static
     * @param {string|Element|null} [selector] - CSS Selector, DOM Element or null (for self-discovery in octopus scripts).
     * @returns {OctopusComponent} A new OctopusComponent instance.
     */
    static getComponent(selector){return new OctopusComponent(selector)}

/* =====================================================================
    OCTOPUS VALS
   ===================================================================== */
    static #vals = new Map()

    static setVal(name, val, unlock = false){
        if(!unlock && octopus.#vals.has(name)){console.warn(`[Octopus] The val "${name}" already exists.`); return}
        octopus.#vals.set(name, val)
    }

    static getVal(name){
        return octopus.#vals.get(name)
    }

/* =====================================================================
    OCTOPUS HELPERS
   ===================================================================== */
    static #helpers = new Map()

    static setHelper(name, callback, unlock = false){
        if(typeof callback !== 'function'){console.warn(`[Octopus] The callback argument is not a function, in helper "${name}".`); return}
        if(!unlock && octopus.#helpers.has(name)){console.warn(`[Octopus] The helper "${name}" already exists.`); return}
        octopus.#helpers.set(name, callback)
    }

    static getHelper(name){
        if(!octopus.#helpers.has(name)){console.warn(`[Octopus] The helper "${name}" doesn't exist.`); return}
        return octopus.#helpers.get(name)
    }

/* =====================================================================
    OCTOPUS ACTIONS
   ===================================================================== */
    static #actions = new Map()

    static setAction(name, callback, unlock = false){
        if(typeof callback !== 'function'){console.warn(`[Octopus] The callback argument is not a function, in action "${name}".`); return}
        if(!unlock && octopus.#actions.has(name)){console.warn(`[Octopus] The action "${name}" already exists.`); return}
        octopus.#actions.set(name, callback)
    }

    static triggerAction(name, value = null){
        if(!octopus.#actions.has(name)){console.warn(`[Octopus] The action "${name}" doesn't exist.`); return}
        octopus.#actions.get(name)(value)
    }

/* =====================================================================
    OCTOPUS SECRETS
   ===================================================================== */
    static #secrets = new Map()

    static setSecret(name, val, password, fun = false){
        if(!octopus.#secrets.has(name)){octopus.#secrets.set(name, new Map())}else if(!octopus.#secrets.get(name)?.has(password) && !fun){return}
        octopus.#secrets.get(name).set(password, val)
    }

    static getSecret(name, password){
        const secret = octopus.#secrets.get(name)?.get(password)
        if(!secret){console.warn(`[Octopus] The secret "${name}" can't be accessed.`); return}
        return secret
    }

/* =====================================================================
    OCTOPUS FULL ACTIVE
   ===================================================================== */

    /**
     * Delegate the exchange of information with the server to OctopusJS.
     * @static
     * @returns {void}
     */
    static fullActive(){
        const body = new OctopusComponent('body')
        body.render(OctopusTemplates.getTemplates())

        body.use('addEventListener', 'submit', (e) => {
            e.preventDefault()
            new OctopusRequest(e.target.action, new FormData(e.target)).autoprocess()
        })
    }

}

class OctopusComponent {

    #ref

    /**
     * Create an instance of OctopusComponent.
     * @param {string|Element|null} [selector] - CSS Selector, DOM Element or null (for self-discovery in octopus scripts).
     * @throws {TypeError}
     */
    constructor(selector){
        if(selector instanceof Element) this.#ref = selector
        else if(typeof selector === 'string') this.#ref = document.querySelector(selector)
        else if(selector === undefined) this.#ref = octopusScripts.pop()?.parentNode
        if(!this.#ref) throw new TypeError('[Octopus] Unexpected OctopusComponent Argument')
    }

    get ref(){return this.#ref}

    getChild(selector){const child = this.#ref.querySelector(selector); return child ? new OctopusComponent(child) : child}

    set(prop, val){this.#ref[prop] = val; return this}

    get(prop){return this.#ref[prop]}

    use(method, ...args){
        if(typeof this.#ref[method] === 'function') return this.#ref[method](...args)
        throw Error(`The ${method} method does not exist.`)
    }

    deleteAll(selector){for(let element of this.#ref.querySelectorAll(selector)) element.remove()}

/* =====================================================================
    COMPONENT LIFE CYCLE
   ===================================================================== */
    
    onMount(callback){
        if(document.body.contains(this.#ref)) callback()
        else{
            new MutationObserver((mutations, obs) => {
                if (document.body.contains(this.#ref)) {
                    callback()
                    obs.disconnect()
                }
            })
            .observe(document.body, { childList: true, subtree: true })
        }
    }

    onUnmount(callback){
        new MutationObserver((mutations, obs) => {
            if (!document.body.contains(this.#ref)) {
                callback()
                obs.disconnect()
            }
        })
        .observe(document.body, { childList: true, subtree: true })
    }

/* =====================================================================
    COMPONENT VALS, HELPERS, ACTIONS, SECRETS
   ===================================================================== */
    
    setVal(name, val, unlock = false){octopus.setVal(name, val, unlock)}

    getVal(name){return octopus.getVal(name)}

    setHelper(name, callback, unlock = false){octopus.setHelper(name, callback, unlock)}

    getHelper(name){return octopus.getHelper(name)}

    setAction(name, callback, unlock = false){octopus.setAction(name, callback, unlock)}

    triggerAction(name, value = null){octopus.triggerAction(name, value)}

    setSecret(name, val, password, fun = false){octopus.setSecret(name, val, password, fun)}

    getSecret(name, password){return octopus.getSecret(name, password)}

/* =====================================================================
    COMPONENT PROPS
   ===================================================================== */
    static #props = new WeakMap()

    setProp(name, val, unlock = false){
        let props = OctopusComponent.#props
        if(!unlock && props.get(this.#ref)?.has(name)){console.warn(`[Octopus] The prop "${name}" already exists.`, this.#ref); return}
        if(!props.get(this.#ref)) props.set(this.#ref, new Map())
        props.get(this.#ref).set(name, val)
    }

    getProp(name){
        const parent = this.#ref.closest('*:has(> script.octopus):not(:scope)')
        if(!parent){console.warn(`[Octopus] Parent not found for prop "${name}"`, this.#ref); return}
        let prop = OctopusComponent.#props.get(parent)?.get(name)
        if(prop === undefined){console.warn(`[Octopus] The prop "${name}" doesn't exist.`, this.#ref); return}
        return prop
    }

    listenChild(name, listener, unlock = false){
        let props = OctopusComponent.#props
        let propName = `childListener-${name}`
        if(!unlock && props.get(this.#ref)?.has(propName)){console.warn(`[Octopus] The child listener "${propName}" already exists.`, this.#ref); return}
        if(!props.get(this.#ref)) props.set(this.#ref, new Map())
        props.get(this.#ref).set(propName, listener)
    }

    sendParent(name, value){
        let propName = `childListener-${name}`
        const parent = this.#ref.closest('*:has(> script.octopus):not(:scope)')
        if(!parent){console.warn(`[Octopus] Parent not found for listener "${name}"`, this.#ref); return}
        let listener = OctopusComponent.#props.get(parent)?.get(propName)
        if(!listener){console.warn(`[Octopus] The child listener "${propName}" doesn't exist.`, this.#ref); return}
        listener(value)
    }

/* =====================================================================
    RENDER
   ===================================================================== */

    /**
     * Renders content in the DOM in an ultra-efficient way.
     * @param {string|Element|OctopusComponent|Array} input - Template or Array [template, data] to process.
     * @param {'before'|'after'} [position='after'] - Relative position where to insert the result. Its behavior changes depending on whether we specify a relative element or not.
     * @param {OctopusComponent|Element} [relativeElement] - Relative element to insert the result.
     * @returns {void}
     * @throws {TypeError}
     */
    render(input, position = 'after', relativeElement){

        const templateFragment = OctopusComponent.#getTemplate(input).content

        const relative = relativeElement?.ref ?? relativeElement

        switch(position){
            case 'into':
                if(!relative) throw Error('The "into" option requires a relative element as the third argument')
                relative.innerHTML = ''
                relative.append(templateFragment)
                break
            case 'before': relative ? relative.before(templateFragment) : this.ref.prepend(templateFragment); break
            default: relative ? relative.after(templateFragment) : this.ref.append(templateFragment); break
        }
    }

    static #getTemplate(input){

        input = input.ref ?? input
    
        if(Array.isArray(input) && input.length === 2){

            let component = input[0].ref ?? input[0]

            if(component instanceof Element) component = component.innerHTML
            else if(typeof component === 'string');
            else throw new TypeError('[Octopus] Render Error: Invalid Template Argument')

            return OctopusTemplates.stringToTemplate(OctopusTemplates.processTemplate(component, input[1]))
        }

        if(input instanceof Element) return OctopusTemplates.stringToTemplate(input.innerHTML)
    
        if(typeof input === 'string') return OctopusTemplates.stringToTemplate(input)
    
        throw new TypeError('[Octopus] Render Error: Invalid Template Argument')
    }

}

class OctopusRequest {
    
    constructor(url, data = null){this.url = url; this.data = data}

    get(callback, callbackError = callback){this.#fetch(new Request(`${this.url}${this.data ? '?' + new URLSearchParams(this.data) : ''}`), callback, callbackError)}

    post(callback, callbackError = callback){this.#fetch(new Request(this.url, {method: 'POST', body: this.data}), callback, callbackError)}

    autoprocess(){this.post((data) => {new OctopusAutoProcess(data)})}

    #fetch(request, callback, callbackError){
        fetch(request)
        .then((response) => {
            if(!response.ok){throw {error: `[Octopus] Request Error: ${response.status} ${response.statusText}.`}}

            const contentType = response.headers.get('Content-Type')
            if (contentType && contentType.includes('application/json')) return response.json()
            return response.text()
        })
        .then((data) => {callback(data)})
        .catch((error) => {callbackError(error)})
    }

}

class OctopusAutoProcess {

    constructor(data){
        if(!data){console.warn('[Octopus] AutoProcess Error: No data received.'); return}

        if(data.message) OctopusFunctions.generateDialog('message', data.message.content, data.message.classes, data.message.options)

        if(data.error) OctopusFunctions.generateDialog('error', data.error, 'bg-danger')
    }

}

class OctopusTemplates {

    static #REGEX_SPACES = /\s+/
    static #REGEX_VARS = /\{\{([^}]+)\}\}/g

    static directives = {

        if(tag, data, string){
            const path = tag.contents[1]
            const condition = path ? path.split('.').reduce((o, i) => o?.[i], data) : false
            
            if(condition) {
                const innerTemplate = string.substring(tag.ending, tag.closeTag.starting)
                return OctopusTemplates.processTemplate(innerTemplate, data)
            }
            return ''
        },

        for(tag, data, string){
            const path = tag.contents[3]
            const list = path ? path.split('.').reduce((o, i) => o?.[i], data) : null

            if(Array.isArray(list)){
                const innerTemplate = string.substring(tag.ending, tag.closeTag.starting)
                const varName = tag.contents[1]
                const chunks = []

                for(let element of list){
                    let forData = Object.create(data)
                    forData[varName] = element
                    chunks.push(OctopusTemplates.processTemplate(innerTemplate, forData))
                }
                return chunks.join('')
            }
            return ''
        }

    }

    static processTemplate(string, data){
        const chunks = []
        let cursor = 0

        try {
            while(true){
                const tag = OctopusTemplates.getPairedTags('8{', '}', string, cursor)
                
                if(!tag){if(cursor < string.length) chunks.push(string.substring(cursor)); break}

                chunks.push(string.substring(cursor, tag.starting))

                if(!tag.closeTag){
                    console.warn(`[Octopus] Template Warning: Unclosed or unknown tag '${tag.contents[0]}'`)
                    chunks.push(string.substring(tag.starting, tag.ending))
                    cursor = tag.ending
                    continue
                }

                const type = tag.contents[0]
                if(OctopusTemplates.directives[type]) chunks.push(OctopusTemplates.directives[type](tag, data, string))
                else chunks.push(string.substring(tag.starting, tag.closeTag.ending))

                cursor = tag.closeTag.ending
            }
        }catch(error){console.error(error); return `<div style="color:red; border:1px solid red; padding:10px;">Octopus Error: ${error.message}</div>`}

        const result = chunks.join('')

        return result.replace(OctopusTemplates.#REGEX_VARS, (match, key) => {
            const value = key.trim().split('.').reduce((o, i) => o?.[i], data);
            
            return value ?? '';
        });
    }

    static getPairedTags(startDelimiter, endDelimiter, string, fromIndex= 0){

        let tag = OctopusTemplates.getTag(startDelimiter, endDelimiter, string, fromIndex)
        if(!tag) return tag

        let typeTag = tag.contents[0]
        if(typeTag !== 'if' && typeTag !== 'for') return tag

        let nested = 0
        let searchFrom = tag.ending
        while(true){
            let nextTag = OctopusTemplates.getTag(startDelimiter, endDelimiter, string, searchFrom)
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

    static getTag(startDelimiter, endDelimiter, string, startingPosition = 0){
        const starting = string.indexOf(startDelimiter, startingPosition)
        if(starting < 0) return null

        const ending = string.indexOf(endDelimiter, starting)
        if(ending < 0) return null

        const contents = string.substring(starting + startDelimiter.length, ending).trim().split(OctopusTemplates.#REGEX_SPACES)
        if(contents.length < 1 || contents[0] === "") return null

        return {'contents': contents, 'starting': starting, 'ending': ending + endDelimiter.length}
    }

    static stringToTemplate(string){
        let template = document.createElement('template')
        template.innerHTML = string
        OctopusTemplates.fixScripts(template)
        return template
    }

    static fixScripts(template){
        const content = template.content

        for(const innerTemplate of content.querySelectorAll('template')) OctopusTemplates.fixScripts(innerTemplate)

        for(const script of content.querySelectorAll('script')){
            const workingScript = document.createElement('script')
            Array.from(script.attributes).forEach(attr => workingScript.setAttribute(attr.name, attr.value))
            workingScript.type = 'module'
            workingScript.textContent = script.textContent
            script.replaceWith(workingScript)
        }
    }

    static getTemplates(){
        return `
            <div id="octopusTemplates">
                ${this.#templateOctopusDialog()}
            </div>
        `
    }

    static #templateOctopusDialog(){
        return `
            <template id="octopusDialogTemplate">
                <dialog id="{{ dialogID }}" class="{{ classes }}">
                    <div>
                        {{ message }}
                        8{for option in options}
                            {{ option }}
                        8{endfor}
                        <button>Close</button>
                    </div>

                    <script type="module">
                        import { octopus } from 'octopus-js-native'

                        const component = octopus.getComponent('#{{ dialogID }}')
                        const button = component.getChild('button')

                        button.use('addEventListener', 'click', () => {
                            component.use('close')
                            component.use('remove')
                        })
                    </script>

                    <style>
                        @scope{
                            >div{
                                display: flex;
                                flex-direction: column;
                            }
                        }
                    </style>
                </dialog>
            </template>
        `
    }
}

class OctopusFunctions {

    static generateDialog(id, message, classes, options = null){
        id = `${id}Dialog`
        const body = new OctopusComponent('body')
        const dialog = body.getChild('#octopusDialogTemplate')
        if(!dialog){console.warn('[Octopus] Dialog Error: Template "#octopusDialogTemplate" not found.'); return}
        const existing = body.getChild(`#${id}`)
        if(existing) existing.use('remove')
        body.render([dialog, {message, classes, options, 'dialogID': id}])
        body.getChild(`#${id}`)?.use('showModal')
    }

}