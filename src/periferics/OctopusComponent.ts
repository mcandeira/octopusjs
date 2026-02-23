import { octopus } from '../octopus'
import { OctopusEngine } from '../engine/OctopusEngine'

const octopusScripts = Array.from(document.querySelectorAll('script.octopus')).reverse()

export class OctopusComponent {

    #ref:any

    /**
     * Create an instance of OctopusComponent.
     * @param {string|Element|null} [selector] - CSS Selector, DOM Element or null (for self-discovery in octopus scripts).
     * @throws {TypeError}
     */
    constructor(selector:any){
        if(selector instanceof Element) this.#ref = selector
        else if(typeof selector === 'string') this.#ref = document.querySelector(selector)
        else if(selector === undefined) this.#ref = octopusScripts.pop()?.parentNode
        if(!this.#ref) throw new TypeError('[Octopus] Unexpected OctopusComponent Argument')
    }

    get ref(){return this.#ref}

    getChild(selector:any){const child = this.#ref.querySelector(selector); return child ? new OctopusComponent(child) : child}

    set(prop:any, val:any){this.#ref[prop] = val; return this}

    get(prop:any){return this.#ref[prop]}

    use(method:any, ...args:any){
        if(typeof this.#ref[method] === 'function') return this.#ref[method](...args)
        throw Error(`The ${method} method does not exist.`)
    }

    deleteAll(selector:any){for(let element of this.#ref.querySelectorAll(selector)) element.remove()}

/* =====================================================================
    COMPONENT LIFE CYCLE
   ===================================================================== */
    
    onMount(callback:any){
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

    onUnmount(callback:any){
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
    
    setVal(name:any, val:any, unlock = false){octopus.setVal(name, val, unlock)}

    getVal(name:any){return octopus.getVal(name)}

    setHelper(name:any, callback:any, unlock = false){octopus.setHelper(name, callback, unlock)}

    getHelper(name:any){return octopus.getHelper(name)}

    setAction(name:any, callback:any, unlock = false){octopus.setAction(name, callback, unlock)}

    triggerAction(name:any, value = null){octopus.triggerAction(name, value)}

    setSecret(name:any, val:any, password:any, fun = false){octopus.setSecret(name, val, password, fun)}

    getSecret(name:any, password:any){return octopus.getSecret(name, password)}

/* =====================================================================
    COMPONENT PROPS
   ===================================================================== */
    static #props = new WeakMap()

    setProp(name:any, val:any, unlock = false){
        let props = OctopusComponent.#props
        if(!unlock && props.get(this.#ref)?.has(name)){console.warn(`[Octopus] The prop "${name}" already exists.`, this.#ref); return}
        if(!props.get(this.#ref)) props.set(this.#ref, new Map())
        props.get(this.#ref).set(name, val)
    }

    getProp(name:any){
        const parent = this.#ref.closest('*:has(> script.octopus):not(:scope)')
        if(!parent){console.warn(`[Octopus] Parent not found for prop "${name}"`, this.#ref); return}
        let prop = OctopusComponent.#props.get(parent)?.get(name)
        if(prop === undefined){console.warn(`[Octopus] The prop "${name}" doesn't exist.`, this.#ref); return}
        return prop
    }

    listenChild(name:any, listener:any, unlock = false){
        let props = OctopusComponent.#props
        let propName = `childListener-${name}`
        if(!unlock && props.get(this.#ref)?.has(propName)){console.warn(`[Octopus] The child listener "${propName}" already exists.`, this.#ref); return}
        if(!props.get(this.#ref)) props.set(this.#ref, new Map())
        props.get(this.#ref).set(propName, listener)
    }

    sendParent(name:any, value:any){
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
    render(input:any, position = 'after', relativeElement?:any){

        const templateFragment = OctopusEngine.getTemplate(input).content

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

}