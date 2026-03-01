import { OctopusUtils } from './OctopusUtils'

type DataActionAssociation = {data: any, __waiters: Array<{value: any, remember: boolean}>}

export class OctopusNervousSystem {

    private static readonly nerveRing: Map<string, DataActionAssociation> = new Map()

    private static setData(
        storage: Map<string, DataActionAssociation>,
        prefix: string, name: string, data: any, override: boolean = false
    )
    : DataActionAssociation|undefined|false
    {
        const content = storage.get(`${prefix}::${name}`)

        if(!override && content?.data !== undefined) return false

        const waiters = content?.__waiters?.filter(waiter => waiter.remember)

        storage.set(`${prefix}::${name}`, {data, __waiters: waiters ?? []})

        return content
    }

    private static receiveData(
        storage: Map<string, DataActionAssociation>,
        prefix: string, name: string, value: any, remember: boolean = false
    )
    : DataActionAssociation|undefined
    {
        const content = storage.get(`${prefix}::${name}`)

        if(!content) storage.set(`${prefix}::${name}`, {data: undefined, __waiters: [{value, remember}]})
        else if(content.data === undefined || remember) content.__waiters.push({value, remember})
        return content
    }

/* =====================================================================
    OCTOPUS VALUES, HELPERS, ACTIONS
   ===================================================================== */

    static setValue(name: string, value: any, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.setValue, [name, String], [override, Boolean])

        const content = this.setData(this.nerveRing, 'val', name, value, override)
        if(content === false) console.warn(OctopusUtils.constant.unOverriddenValue(name))
        else if(content) content.__waiters?.forEach(waiter => {waiter.value(value)})
    }

    static receiveValue(name: string, callback: Function, remember: boolean = true): void
    {
        OctopusUtils.function.validate(this.receiveValue, [name, String], [callback, Function], [remember, Boolean])

        const content = this.receiveData(this.nerveRing, 'val', name, callback, remember)
        if(content?.data !== undefined) callback(content.data)
    }

    static setProtected(name: string, value: any, password: string): void
    {
        OctopusUtils.function.validate(this.setProtected, [name, String], [password, String])

        const content = this.setData(this.nerveRing, 'pro', `${name}::${password}`, value, true)
        if(content) content.__waiters?.forEach(waiter => {waiter.value(value)})
    }

    static receiveProtected(name: string, password: string, callback: Function, remember: boolean = true): void
    {
        OctopusUtils.function.validate(this.receiveProtected, [name, String], [password, String], [callback, Function], [remember, Boolean])

        const content = this.receiveData(this.nerveRing, 'pro', `${name}::${password}`, callback, remember)
        if(content?.data !== undefined) callback(content.data)
    }

    static setHelper(name: string, callback: Function, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.setHelper, [name, String], [callback, Function], [override, Boolean])

        const content = this.setData(this.nerveRing, 'help', name, callback, override)
        if(content === false) console.warn(OctopusUtils.constant.unOverriddenHelper(name))
        else if(content) content.__waiters?.forEach(waiter => {waiter.value(callback)})
    }

    static receiveHelper(name: string, callback: Function, remember: boolean = false): void
    {
        OctopusUtils.function.validate(this.receiveHelper, [name, String], [callback, Function], [remember, Boolean])

        const content = this.receiveData(this.nerveRing, 'help', name, callback, remember)
        if(content?.data !== undefined) callback(content.data)
    }

    static setAction(name: string, action: Function, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.setAction, [name, String], [action, Function], [override, Boolean])

        const content = this.setData(this.nerveRing, 'act', name, action, override)
        if(content === false) console.warn(OctopusUtils.constant.unOverriddenAction(name))
        else if(content) content.__waiters?.forEach(waiter => {action(waiter.value)})
    }

    static triggerAction(name: string, value: any = undefined, remember: boolean = false): void
    {
        OctopusUtils.function.validate(this.triggerAction, [name, String], [remember, Boolean])

        const content = this.receiveData(this.nerveRing, 'act', name, value, remember)
        if(content?.data !== undefined) content.data(value)
    }

/* =====================================================================
    OCTOPUS PROPS
   ===================================================================== */

    private static readonly nerveCord: WeakMap<Element, Map<string, DataActionAssociation>> = new WeakMap()

    static setProp(reference: Element, name: string, value: any, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.setProp, [reference, Element], [name, String], [override, Boolean])
        
        let selfProps = this.nerveCord.get(reference)

        if(!selfProps){
            let props = new Map()
            this.nerveCord.set(reference, props)
            selfProps = props
        }

        const content = this.setData(selfProps, 'prop', name, value, override)
        if(content === false) console.warn(OctopusUtils.constant.unOverriddenProp(name), reference)
        else if(content) content.__waiters?.forEach(waiter => {waiter.value(value)})
    }

    static receiveProp(reference: Element, name: string, callback: Function, remember: boolean = true): void
    {
        OctopusUtils.function.validate(this.receiveProp, [reference, Element], [name, String], [callback, Function], [remember, Boolean])

        const parent = reference.parentElement?.closest('*:has(> script.octopus)')
        if(!parent){console.warn(OctopusUtils.constant.parentPropNotFound(name), reference); return}

        let parentProps = this.nerveCord.get(parent)

        if(!parentProps){
            let props = new Map()
            this.nerveCord.set(reference, props)
            parentProps = props
        }

        const content = this.receiveData(parentProps, 'prop', name, callback, remember)
        if(content?.data !== undefined) callback(content.data)
    }

    static setChildListener(reference: Element, name: string, callback: Function, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.setChildListener, [reference, Element], [name, String], [callback, Function], [override, Boolean])

        let selfProps = this.nerveCord.get(reference)

        if(!selfProps){
            let props = new Map()
            this.nerveCord.set(reference, props)
            selfProps = props
        }

        const content = this.setData(selfProps, 'listener', name, callback, override)
        if(content === false) console.warn(OctopusUtils.constant.unOverriddenListener(name), reference)
        else if(content) content.__waiters?.forEach(waiter => {callback(waiter.value)})
    }

    static receiveChildListener(reference: Element, name: string, value: any = null, remember: boolean = false): void
    {
        OctopusUtils.function.validate(this.receiveChildListener, [reference, Element], [name, String], [remember, Boolean])

        const parent = reference.parentElement?.closest('*:has(> script.octopus)')
        if(!parent){console.warn(OctopusUtils.constant.parentListenerNotFound(name), reference); return}

        let parentProps = this.nerveCord.get(parent)

        if(!parentProps){
            let props = new Map()
            this.nerveCord.set(reference, props)
            parentProps = props
        }

        const content = this.receiveData(parentProps, 'listener', name, value, remember)
        if(content?.data !== undefined) content.data(value)
    }

}