import { Selector, OctopusUtils, Input } from './OctopusUtils'
import { OctopusNervousSystem } from './OctopusNervousSystem'
import { OctopusEngine } from '../engine/OctopusEngine'

type Position = 'beforebegin'|'afterbegin'|'beforeend'|'afterend'|'into'|'default'

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
        throw new Error(`${OctopusUtils.constant.methodNotExist}${method}`)
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
            new MutationObserver(([], obs) => {
                if(document.body.contains(this._ref)){callback(); obs.disconnect()}
            })
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
        
        new MutationObserver(([], obs) => {
            if(!document.body.contains(this._ref)){callback(); obs.disconnect()}
        })
        .observe(document.body, { childList: true, subtree: true })
    }

/* =====================================================================
    COMPONENT VALUES, HELPERS, ACTIONS
   ===================================================================== */

    /**
     * Registers a global value in the Central Nervous System.
     * @param {string} name - The unique name for the value.
     * @param {any} value - The data payload to register.
     * @param {boolean} [override=false] - If true, overwrites an existing value with the same name.
     * @returns {void}
     */
    setValue(name: string, value: any, override: boolean = false): void
    {
        OctopusNervousSystem.setValue(name, value, override)
    }

    /**
     * Subscribes to a global value from the Central Nervous System.
     * @param {string} name - The name of the registered value.
     * @param {Function} callback - The function to execute when the value is available.
     * @param {boolean} [remember=true] - If true, the callback will execute whenever the value changes.
     * @returns {void}
     */
    receiveValue(name: string, callback: Function, remember: boolean = true): void
    {
        OctopusNervousSystem.receiveValue(name, callback, remember)
    }

    /**
     * Registers a globally protected value requiring a password.
     * @param {string} name - The unique name for the protected value.
     * @param {any} value - The sensitive data payload to register.
     * @param {string} password - The password required to retrieve the value.
     * @returns {void}
     */
    setProtected(name: string, value: any, password: string): void
    {
        OctopusNervousSystem.setProtected(name, value, password)
    }

    /**
     * Subscribes to a globally protected value using a password.
     * @param {string} name - The name of the protected value.
     * @param {string} password - The password required to unlock the value.
     * @param {Function} callback - The function to execute when the value is available.
     * @param {boolean} [remember=true] - If true, the callback will execute whenever the value changes.
     * @returns {void}
     */
    receiveProtected(name: string, password: string, callback: Function, remember: boolean = true): void
    {
        OctopusNervousSystem.receiveProtected(name, password, callback, remember)
    }

    /**
     * Registers a global helper function.
     * @param {string} name - The unique name for the helper.
     * @param {Function} callback - The helper function to register.
     * @param {boolean} [override=false] - If true, overwrites an existing helper.
     * @returns {void}
     */
    setHelper(name: string, callback: Function, override: boolean = false): void
    {
        OctopusNervousSystem.setHelper(name, callback, override)
    }

    /**
     * Retrieves or subscribes to a global helper function.
     * @param {string} name - The name of the registered helper.
     * @param {Function} callback - The function that will receive the helper.
     * @param {boolean} [remember=false] - If true, the helper will be received whenever it changes.
     * @returns {void}
     */
    receiveHelper(name: string, callback: Function, remember: boolean = false): void
    {
        OctopusNervousSystem.receiveHelper(name, callback, remember)
    }

    /**
     * Registers a global action in the Central Nervous System.
     * @param {string} name - The unique name for the action.
     * @param {Function} action - The action function to register.
     * @param {boolean} [override=false] - If true, overwrites an existing action.
     * @returns {void}
     */
    setAction(name: string, action: Function, override: boolean = false): void
    {
        OctopusNervousSystem.setAction(name, action, override)
    }

    /**
     * Triggers a globally registered action.
     * @param {string} name - The name of the action to trigger.
     * @param {any} [value=undefined] - The optional payload to pass to the action.
     * @param {boolean} [remember=false] - If true, the action will be triggered whenever it changes.
     * @returns {void}
     */
    triggerAction(name: string, value: any = undefined, remember: boolean = false): void
    {
        OctopusNervousSystem.triggerAction(name, value, remember)
    }

/* =====================================================================
    COMPONENT PROPS
   ===================================================================== */

    /**
     * Emits a prop value to descendants scoped to this component.
     * @param {string} name - The name of the prop.
     * @param {any} value - The payload of the prop.
     * @param {boolean} [override=false] - If true, overwrites an existing prop with the same name.
     * @returns {void}
     */
    setProp(name: string, value:any, override: boolean = false): void
    {
        OctopusNervousSystem.setProp(this._ref, name, value, override)
    }

    /**
     * Subscribes to a prop value scoped to this component.
     * @param {string} name - The name of the prop.
     * @param {Function} callback - The function to execute when the prop is available.
     * @param {boolean} [remember=true] - If true, the callback will execute whenever the prop changes.
     * @returns {void}
     */
    receiveProp(name: string, callback: Function, remember: boolean = true): void
    {
        OctopusNervousSystem.receiveProp(this._ref, name, callback, remember)
    }

    /**
     * Subscribes to child events or data scoped to this component.
     * @param {string} name - The name of the child event/data.
     * @param {Function} callback - The function to execute when received.
     * @param {boolean} [override=false] - If true, overwrites an existing child receiver.
     * @returns {void}
     */
    setChildListener(name: string, callback: Function, override: boolean = false): void
    {
        OctopusNervousSystem.setChildListener(this._ref, name, callback, override)
    }

    /**
     * Emits an event or data upwards to parent component.
     * @param {string} name - The name of the parent event/data.
     * @param {any} value - The payload to send upwards.
     * @param {boolean} [remember=true] - If true, the parent listener will be triggered whenever it changes.
     * @returns {void}
     */
    receiveChildListener(name: string, value: any, remember: boolean = true): void
    {
        OctopusNervousSystem.receiveChildListener(this._ref, name, value, remember)
    }

/* =====================================================================
    RENDER
   ===================================================================== */

    /**
     * Renders content in the DOM.
     * @param {Input} input - Template (OctopusComponent, Element or string) or Array [Template, data] to process.
     * @param {Position} [position='default'] - Relative position where to insert the result.
     * @param {OctopusComponent|Element} [relativeElement] - Relative element to insert the result.
     * @returns {void}
     * @throws {TypeError}
     */
    render(input: Input, position: Position = 'default', relativeElement: OctopusComponent|Element = this._ref): void
    {
        const processedInput = OctopusEngine.process(input)

        const relative = relativeElement instanceof OctopusComponent ? relativeElement._ref : relativeElement

        switch(position){
            case 'beforebegin': relative.before(processedInput); break
            case 'afterbegin': relative.prepend(processedInput); break
            case 'beforeend': relative.append(processedInput); break
            case 'afterend': relative.after(processedInput); break
            case 'into':
                if(relative === this._ref) throw new Error(OctopusUtils.constant.notHimself)
                relative.replaceChildren(processedInput)
                break
            default:
                if(relative === this._ref) relative.append(processedInput)
                else relative.after(processedInput)
        }
    }
}