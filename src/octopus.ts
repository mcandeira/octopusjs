import { OctopusComponent } from './periferics/OctopusComponent'
import { OctopusTemplates } from './control/OctopusTemplates'
import { OctopusRequest } from './control/OctopusRequest'

export class octopus {

    /**
     * Factory method to instantiate an OctopusComponent object.
     * @static
     * @param {string|Element|null} [selector] - CSS Selector, DOM Element or null (for self-discovery in octopus scripts).
     * @returns {OctopusComponent} A new OctopusComponent instance.
     */
    static getComponent(selector: any){return new OctopusComponent(selector)}

/* =====================================================================
    OCTOPUS VALS
   ===================================================================== */
    static #vals = new Map()

    static setVal(name: any, val: any, unlock = false){
        if(!unlock && octopus.#vals.has(name)){console.warn(`[Octopus] The val "${name}" already exists.`); return}
        octopus.#vals.set(name, val)
    }

    static getVal(name: any){
        return octopus.#vals.get(name)
    }

/* =====================================================================
    OCTOPUS HELPERS
   ===================================================================== */
    static #helpers = new Map()

    static setHelper(name: any, callback: any, unlock = false){
        if(typeof callback !== 'function'){console.warn(`[Octopus] The callback argument is not a function, in helper "${name}".`); return}
        if(!unlock && octopus.#helpers.has(name)){console.warn(`[Octopus] The helper "${name}" already exists.`); return}
        octopus.#helpers.set(name, callback)
    }

    static getHelper(name: any){
        if(!octopus.#helpers.has(name)){console.warn(`[Octopus] The helper "${name}" doesn't exist.`); return}
        return octopus.#helpers.get(name)
    }

/* =====================================================================
    OCTOPUS ACTIONS
   ===================================================================== */
    static #actions = new Map()

    static setAction(name: any, callback: any, unlock = false){
        if(typeof callback !== 'function'){console.warn(`[Octopus] The callback argument is not a function, in action "${name}".`); return}
        if(!unlock && octopus.#actions.has(name)){console.warn(`[Octopus] The action "${name}" already exists.`); return}
        octopus.#actions.set(name, callback)
    }

    static triggerAction(name: any, value = null){
        if(!octopus.#actions.has(name)){console.warn(`[Octopus] The action "${name}" doesn't exist.`); return}
        octopus.#actions.get(name)(value)
    }

/* =====================================================================
    OCTOPUS SECRETS
   ===================================================================== */
    static #secrets = new Map()

    static setSecret(name: any, val: any, password: any, fun = false){
        if(!octopus.#secrets.has(name)){octopus.#secrets.set(name, new Map())}else if(!octopus.#secrets.get(name)?.has(password) && !fun){return}
        octopus.#secrets.get(name).set(password, val)
    }

    static getSecret(name: any, password: any){
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

        body.use('addEventListener', 'submit', (e: any) => {
            e.preventDefault()
            new OctopusRequest(e.target.action, new FormData(e.target)).autoprocess()
        })
    }

}