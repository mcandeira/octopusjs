import { Selector, OctopusUtils, Input, Position } from './OctopusUtils.ts'
import { OctopusNervousSystem } from './nervous/OctopusNervousSystem.ts'
import { OctopusEngine } from '../engine/OctopusEngine.ts'

const octopusScripts = Array.from(document.querySelectorAll('script.octopus')).reverse()

export class OctopusComponent {

    private _ref: Element

    constructor(selector?: Selector)
    {
        const reference = selector === undefined ? octopusScripts.pop()?.parentElement :
                          typeof selector === 'string' ? document.querySelector(selector) : selector
                
        OctopusUtils.function.validate(this.constructor, [reference, Element])
        
        this._ref = reference as Element
    }

    /**
     * Gets the subyacent native DOM Element.
     * @returns {Element} The native DOM Element.
     */
    get ref(): Element
    {
        return this._ref
    }

    /**
     * Finds the first descendant element that matches the selector and return it as an OctopusComponent.
     * @param {string} selector - CSS selector to search for.
     * @returns {OctopusComponent|undefined} The wrapped child component, or undefined if not found.
     */
    getChild(selector: string): OctopusComponent|undefined
    {
        OctopusUtils.function.validate(this.getChild, [selector, String])

        const child = this._ref.querySelector(selector)
        return child ? new OctopusComponent(child) : undefined
    }

    /**
     * Sets a property or attribute on the subyacent Element.
     * @param {string} prop - The property or attribute name.
     * @param {any} value - The value to set.
     * @returns {this} The current OctopusComponent instance for chaining.
     */
    set(prop: string, value: any): this
    {
        OctopusUtils.function.validate(this.set, [prop, String])

        if(prop in this._ref) (this._ref as any)[prop] = value
        else this._ref.setAttribute(prop, value)
        return this
    }

    /**
     * Gets a property or attribute from the subyacent Element.
     * @param {string} prop - The property or attribute name.
     * @returns {any} The value of the property or attribute.
     */
    get(prop: string): any
    {
        OctopusUtils.function.validate(this.get, [prop, String])

        return prop in this._ref ? (this._ref as any)[prop] : this._ref.getAttribute(prop)
    }

    /**
     * Safely executes a native method on the subyacent Element.
     * @param {string} method - The native method name to execute.
     * @param {...any} args - Arguments to pass to the native method.
     * @returns {any} The result of the native method execution.
     * @throws {Error} If the method does not exist on the native Element.
     */
    use(method: string, ...args: any[]): any
    {
        OctopusUtils.function.validate(this.use, [method, String])

        const ref = this._ref as any
        if(typeof ref[method] === 'function') return ref[method](...args)
        throw new Error(OctopusUtils.constant.methodNotExist(method))
    }

    /**
     * Removes all descendant elements that match the provided CSS selector.
     * @param {string} selector - CSS selector of the elements to remove.
     * @returns {void}
     */
    deleteAll(selector: string): void
    {
        OctopusUtils.function.validate(this.deleteAll, [selector, String])

        const elements = this._ref.querySelectorAll(selector)
        for(let element of elements) element.remove()
    }

/* =====================================================================
    COMPONENT LIFE CYCLE
   ===================================================================== */
    
    /**
     * Executes a callback when the component is mounted (attached to the DOM).
     * @param {Function} callback - The function to execute on mount.
     * @returns {void}
     */
    onMount(callback: Function): void
    {
        OctopusUtils.function.validate(this.onMount, [callback, Function])

        if(document.body.contains(this._ref)) callback()
        else{
            new MutationObserver(([], obs) => {if(document.body.contains(this._ref)){callback(); obs.disconnect()}})
            .observe(document.body, { childList: true, subtree: true })
        }
    }

    /**
     * Executes a callback when the component is unmounted (detached from the DOM).
     * @param {Function} callback - The function to execute on unmount.
     * @returns {void}
     */
    onUnmount(callback: Function): void
    {
        OctopusUtils.function.validate(this.onUnmount, [callback, Function])
        
        new MutationObserver(([], obs) => {if(!document.body.contains(this._ref)){callback(); obs.disconnect()}})
        .observe(document.body, { childList: true, subtree: true })
    }

/* =====================================================================
    COMPONENT VALUES, HELPERS, ACTIONS
   ===================================================================== */

    /**
     * Sends a value to the Octopus Central Nervous System.
     * @param {string} name - The name of the value.
     * @param {any} [value=undefined] - The optional data payload to send.
     * @param {string|undefined} [password=undefined] - Prevents write access to the value by password.
     * @param {boolean} [accessible=true] - If true, allows public read access. If false, prevents public read access by password.
     * @returns {void}
     */
    sendValue(name: string, value: any = undefined, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusNervousSystem.sendValue(name, value, password, accessible)
    }

    /**
     * Receives the value sent to the Octopus Central Nervous System.
     * @param {string} name - The name of the sent value.
     * @param {Function} callback - The function to execute.
     * @param {boolean|undefined} [immediate=undefined] 
     * - If true: Forces immediate execution even if the value was not yet sent (undefined).
     * - If false: The execution always waits to the next sent value.
     * - If undefined: Executes as soon as the value is available.
     * @param {boolean} [once=false] - If true, the receiver will execute only once. If false, the receiver will execute whenever the value changes.
     * @param {string|undefined} [password=undefined] - Allows receiving private values protected by password.
     * @returns {void}
     */
    receiveValue(name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = false, password: string|undefined = undefined): void
    {
        OctopusNervousSystem.receiveValue(name, callback, immediate, once, password)
    }

    /**
     * Sends a helper function to the Octopus Central Nervous System.
     * @param {string} name - The name of the helper.
     * @param {Function} helper - The helper function to send.
     * @param {string|undefined} [password=undefined] - Prevents write access to the helper by password.
     * @param {boolean} [accessible=true] - If true, allows public read access. If false, prevents public read access by password.
     * @returns {void}
     */
    sendHelper(name: string, helper: Function, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusNervousSystem.sendHelper(name, helper, password, accessible)
    }

    /**
     * Receives the helper function sent to the Octopus Central Nervous System.
     * @param {string} name - The name of the sent helper.
     * @param {Function} callback - The function to execute.
     * @param {boolean|undefined} [immediate=undefined] 
     * - If true: Forces immediate execution even if the helper was not yet sent (undefined).
     * - If false: The execution always waits to the next sent helper.
     * - If undefined: Executes as soon as the helper is available.
     * @param {boolean} [once=true] - If true, the receiver will execute only once. If false, the receiver will execute whenever the helper changes.
     * @param {string|undefined} [password=undefined] - Allows receiving private values protected by password.
     * @returns {void}
     */
    receiveHelper(name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = true, password: string|undefined = undefined): void
    {
        OctopusNervousSystem.receiveHelper(name, callback, immediate, once, password)
    }

    /**
     * Sets an action in the Octopus Central Nervous System.
     * @param {string} name - The name of the action to set.
     * @param {Function} action - The action function to set.
     * @param {boolean|undefined} [immediate=undefined] 
     * - If true: Forces immediate execution even if a trigger was not yet sent (undefined).
     * - If false: The execution always waits to the next trigger.
     * - If undefined: Executes as soon as a trigger is available.
     * @param {boolean} [once=false] - If true, the action will execute only once. If false, the action will execute whenever it is triggered.
     * @param {string|undefined} [password=undefined] - Allows reacting to private triggers protected by password.
     * @returns {void}
     */
    setAction(name: string, action: Function, immediate: boolean|undefined = undefined, once: boolean = false, password: string|undefined = undefined): void
    {
        OctopusNervousSystem.setAction(name, action, immediate, once, password)
    }

    /**
     * Triggers an action set in the Octopus Central Nervous System.
     * @param {string} name - The name of the action to trigger.
     * @param {any} [value=undefined] - The optional data payload to pass to the action.
     * @param {string|undefined} [password=undefined] - Prevents write access to the value by password.
     * @param {boolean} [accessible=true] - If true, allows public read access. If false, prevents public read access by password.
     * @returns {void}
     */
    triggerAction(name: string, value: any = undefined, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusNervousSystem.triggerAction(name, value, password, accessible)
    }

/* =====================================================================
    COMPONENT PROPS
   ===================================================================== */

    /**
     * Sends a prop to descendants scoped to this component.
     * @param {string} name - The name for the prop.
     * @param {any} [value=undefined] - The optional data payload to send.
     * @returns {void}
     */
    sendProp(name: string, value: any = undefined): void
    {
        OctopusNervousSystem.sendProp(this._ref, name, value)
    }

    /**
     * Receives a prop scoped to this component.
     * @param {string} name - The name of the prop.
     * @param {Function} callback - The function to execute.
     * @param {boolean|undefined} [immediate=undefined] 
     * - If true: Forces immediate execution even if the prop was not yet sent (undefined).
     * - If false: The execution always waits to the next sent prop.
     * - If undefined: Executes as soon as the prop is available.
     * @param {boolean} [once=false] - If true, the receiver will execute only once. If false, the receiver will execute whenever the prop changes.
     * @returns {void}
     */
    receiveProp(name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = false): void
    {
        OctopusNervousSystem.receiveProp(this._ref, name, callback, immediate, once)
    }

    /**
     * Sends a value/signal to the parent component.
     * @param {string} name - The name of the value/signal to send.
     * @param {any} [value=undefined] - The optional data payload to send.
     * @returns {void}
     */
    sendParent(name: string, value: any = undefined): void
    {
        OctopusNervousSystem.sendParent(this._ref, name, value)
    }

    /**
     * Receives a value/signal sent by a child component.
     * @param {string} name - The name of the value/signal sent.
     * @param {Function} callback - The function to execute.
     * @param {boolean|undefined} [immediate=undefined] 
     * - If true: Forces immediate execution even if the child was not yet sent anything (undefined).
     * - If false: The execution always waits to the next child value/signal.
     * - If undefined: Executes as soon as the value/signal is available.
     * @param {boolean} [once=false] - If true, the receiver will execute only once. If false, the receiver will execute whenever the value/signal is sent.
     * @returns {void}
     */
    receiveChild(name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = false): void
    {
        OctopusNervousSystem.receiveChild(this._ref, name, callback, immediate, once)
    }

/* =====================================================================
    RENDER
   ===================================================================== */

    /**
     * Renders content in the DOM.
     * @param {Input} input - Template (OctopusComponent, Element or string) or Array [Template, data] to process.
     * @param {Position} [position='default'] - Relative position where to insert the result.
     * @param {OctopusComponent|Element} [relative] - Relative element to insert the result.
     * @returns {void}
     * @throws {TypeError}
     */
    render(input: Input, position: Position = 'default', relative: OctopusComponent|Element = this._ref): void
    {
        OctopusEngine.render(input, position, relative)
    }

}