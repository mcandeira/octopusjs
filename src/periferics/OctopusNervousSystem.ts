import { OctopusUtils } from './OctopusUtils'

type DataActionAssociation = {data: any, __waiters: Array<{value: any, remember: boolean}>}

export class OctopusNervousSystem {

    private static readonly nerveRing: Map<string, DataActionAssociation> = new Map()

    private static registerData(prefix: string, name: string, data: any, override: boolean = false): DataActionAssociation|undefined|false
    {
        const content = this.nerveRing.get(`${prefix}::${name}`)

        if(!override && content?.data !== undefined) return false

        const waiters = content?.__waiters?.filter(waiter => waiter.remember)

        this.nerveRing.set(`${prefix}::${name}`, {data, __waiters: waiters ?? []})

        return content
    }

    private static deliverData(prefix: string, name: string, value: any, remember: boolean = false): DataActionAssociation|undefined
    {
        const content = this.nerveRing.get(`${prefix}::${name}`)

        if(!content) this.nerveRing.set(`${prefix}::${name}`, {data: undefined, __waiters: [{value, remember}]})
        else if(content.data === undefined || remember) content.__waiters.push({value, remember})
        return content
    }

/* =====================================================================
    OCTOPUS VALUES, HELPERS, ACTIONS
   ===================================================================== */

    static registerValue(name: string, value: any, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.registerValue, [name, String], [override, Boolean])

        const content = this.registerData('val', name, value, override)
        if(content === false) console.warn(OctopusUtils.constant.unOverriddenValue, name)
        else if(content) content.__waiters?.forEach(waiter => {waiter.value(value)})
    }

    static deliverValue(name: string, callback: Function, remember: boolean = true): void
    {
        OctopusUtils.function.validate(this.deliverValue, [name, String], [callback, Function], [remember, Boolean])

        const content = this.deliverData('val', name, callback, remember)
        if(content?.data !== undefined) callback(content.data)
    }

    static registerProtected(name: string, value: any, password: string): void
    {
        OctopusUtils.function.validate(this.registerProtected, [name, String], [password, String])

        const content = this.registerData('pro', `${name}::${password}`, value, true)
        if(content) content.__waiters?.forEach(waiter => {waiter.value(value)})
    }

    static deliverProtected(name: string, password: string, callback: Function, remember: boolean = true): void
    {
        OctopusUtils.function.validate(this.deliverProtected, [name, String], [password, String], [callback, Function], [remember, Boolean])

        const content = this.deliverData('pro', `${name}::${password}`, callback, remember)
        if(content?.data !== undefined) callback(content.data)
    }

    static registerHelper(name: string, callback: Function, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.registerHelper, [name, String], [callback, Function], [override, Boolean])

        const content = this.registerData('help', name, callback, override)
        if(content === false) console.warn(OctopusUtils.constant.unOverriddenHelper, name)
        else if(content) content.__waiters?.forEach(waiter => {waiter.value(callback)})
    }

    static deliverHelper(name: string, callback: Function, remember: boolean = false): void
    {
        OctopusUtils.function.validate(this.deliverHelper, [name, String], [callback, Function], [remember, Boolean])

        const content = this.deliverData('help', name, callback, remember)
        if(content?.data !== undefined) callback(content.data)
    }

    static registerAction(name: string, action: Function, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.registerAction, [name, String], [action, Function], [override, Boolean])

        const content = this.registerData('act', name, action, override)
        if(content === false) console.warn(OctopusUtils.constant.unOverriddenAction, name)
        else if(content) content.__waiters?.forEach(waiter => {action(waiter.value)})
    }

    static triggerAction(name: string, value: any = undefined, remember: boolean = false): void
    {
        OctopusUtils.function.validate(this.triggerAction, [name, String], [remember, Boolean])

        const content = this.deliverData('act', name, value, remember)
        if(content?.data !== undefined) content.data(value)
    }

/* =====================================================================
    OCTOPUS PROPS
   ===================================================================== */

    private static readonly nerveCord: WeakMap<Element, Map<string, DataActionAssociation>> = new WeakMap()

    static registerProp(reference: Element, name: string, value: any, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.registerProp, [reference, Element], [name, String], [override, Boolean])
        
        let selfProps = this.nerveCord.get(reference)
        const content = selfProps?.get(`direct::${name}`)

        if(!override && content?.data !== undefined){console.warn(OctopusUtils.constant.unOverriddenProp, reference, name); return}

        const waiters = content?.__waiters?.filter(waiter => waiter.remember)

        if(!selfProps) selfProps = this.nerveCord.set(reference, new Map()).get(reference)
        selfProps?.set(`direct::${name}`, {data: value, __waiters: waiters ?? []})
        content?.__waiters?.forEach(waiter => {waiter.value(value)})
    }

    static deliverProp(reference: Element, name: string, callback: Function, remember: boolean = true): void
    {
        OctopusUtils.function.validate(this.deliverProp, [reference, Element], [name, String], [callback, Function], [remember, Boolean])

        const parent = reference.parentElement?.closest('*:has(> script.octopus)')
        if(!parent){console.warn(OctopusUtils.constant.parentPropNotFound, reference, name); return}

        let parentProps = this.nerveCord.get(parent)
        const content = parentProps?.get(`direct::${name}`)

        if(!parentProps) parentProps = this.nerveCord.set(parent, new Map()).get(parent)
        if(!content) parentProps?.set(`direct::${name}`, {data: undefined, __waiters: [{value: callback, remember}]})
        else{
            if(content.data === undefined || remember) content.__waiters.push({value: callback, remember})
            if(content.data !== undefined) callback(content.data)
        }
    }

    static receiveChild(reference: Element, name: string, callback: Function, override: boolean = false): void
    {
        OctopusUtils.function.validate(this.receiveChild, [reference, Element], [name, String], [callback, Function], [override, Boolean])

        let selfProps = this.nerveCord.get(reference)
        const content = selfProps?.get(`inverse::${name}`)

        if(!override && content?.data !== undefined){console.warn(OctopusUtils.constant.unOverriddenChild, reference, name); return}

        const waiters = content?.__waiters?.filter(waiter => waiter.remember)

        if(!selfProps) selfProps = this.nerveCord.set(reference, new Map()).get(reference)
        selfProps?.set(`inverse::${name}`, {data: callback, __waiters: waiters ?? []})
        content?.__waiters?.forEach(waiter => {callback(waiter.value)})
    }

    static sendParent(reference: Element, name: string, value: any = null, remember: boolean = false): void
    {
        OctopusUtils.function.validate(this.sendParent, [reference, Element], [name, String], [remember, Boolean])

        const parent = reference.parentElement?.closest('*:has(> script.octopus)')
        if(!parent){console.warn(OctopusUtils.constant.parentListenerNotFound, reference, name); return}

        let parentProps = this.nerveCord.get(parent)
        const content = parentProps?.get(`inverse::${name}`)

        if(!parentProps) parentProps = this.nerveCord.set(parent, new Map()).get(parent)
        if(!content) parentProps?.set(`inverse::${name}`, {data: undefined, __waiters: [{value, remember}]})
        else{
            if(content.data === undefined || remember) content.__waiters.push({value, remember})
            if(content.data !== undefined) content.data(value)
        }
    }

}