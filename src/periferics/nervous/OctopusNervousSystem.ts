import { OctopusChannelsStorage } from './OctopusChannelsStorage.ts'
import { OctopusUtils } from '../OctopusUtils.ts'

export class OctopusNervousSystem {

    private static readonly nerveRing: OctopusChannelsStorage = new OctopusChannelsStorage()

    static sendValue(name: string, value: any = undefined, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusUtils.function.validate(this.sendValue, [name, String], [password, undefined, String], [accessible, Boolean])

        const success = this.nerveRing.sendData('value', name, value, password, accessible)
        if(!success) console.warn(OctopusUtils.constant.protectedValue(name))
    }

    static receiveValue(name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = false,  password: string|undefined = undefined): void
    {
        OctopusUtils.function.validate(this.receiveValue, [name, String], [callback, Function], [immediate, Boolean, undefined], [once, Boolean], [password, undefined, String])

        const success = this.nerveRing.receiveData('value', name, callback, immediate, once, password)        
        if(!success) console.warn(OctopusUtils.constant.protectedValue(name))
    }

    static sendHelper(name: string, helper: Function, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusUtils.function.validate(this.sendHelper, [name, String], [helper, Function], [password, undefined, String], [accessible, Boolean])

        const success = this.nerveRing.sendData('helper', name, helper, password, accessible)
        if(!success) console.warn(OctopusUtils.constant.protectedHelper(name))
    }

    static receiveHelper(name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = true, password: string|undefined = undefined): void
    {
        OctopusUtils.function.validate(this.receiveHelper, [name, String], [callback, Function], [immediate, Boolean, undefined], [once, Boolean], [password, undefined, String])

        const success = this.nerveRing.receiveData('helper', name, callback, immediate, once, password)
        if(!success) console.warn(OctopusUtils.constant.protectedHelper(name))
    }

    static triggerAction(name: string, value: any = undefined, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusUtils.function.validate(this.triggerAction, [name, String], [password, undefined, String], [accessible, Boolean])

        const success = this.nerveRing.sendData('action', name, value, password, accessible)
        if(!success) console.warn(OctopusUtils.constant.protectedAction(name))
    }

    static setAction(name: string, action: Function, immediate: boolean|undefined = undefined, once: boolean = false, password: string|undefined = undefined): void
    {
        OctopusUtils.function.validate(this.setAction, [name, String], [action, Function], [immediate, Boolean, undefined], [once, Boolean], [password, undefined, String])

        const success = this.nerveRing.receiveData('action', name, action, immediate, once, password)
        if(!success) console.warn(OctopusUtils.constant.protectedAction(name))
    }

/* =====================================================================
    OCTOPUS PROPS
   ===================================================================== */

    private static readonly nerveCord: WeakMap<Element, OctopusChannelsStorage> = new WeakMap()

    static sendProp(reference: Element, name: string, value: any = undefined): void
    {
        OctopusUtils.function.validate(this.sendProp, [reference, Element], [name, String])
        
        let selfProps = this.nerveCord.get(reference)

        if(!selfProps){
            selfProps = new OctopusChannelsStorage()
            this.nerveCord.set(reference, selfProps)
        }

        selfProps.sendData('downward', name, value)
    }

    static receiveProp(reference: Element, name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = false): void
    {
        OctopusUtils.function.validate(this.receiveProp, [reference, Element], [name, String], [callback, Function], [immediate, Boolean, undefined], [once, Boolean])

        const parent = reference.parentElement?.closest('*:has(> script.octopus)')
        if(!parent){console.warn(OctopusUtils.constant.parentPropNotFound(name), reference); return}

        let parentProps = this.nerveCord.get(parent)

        if(!parentProps){
            parentProps = new OctopusChannelsStorage()
            this.nerveCord.set(parent, parentProps)
        }

        parentProps.receiveData('downward', name, callback, immediate, once)
    }

    static sendParent(reference: Element, name: string, value: any = undefined): void
    {
        OctopusUtils.function.validate(this.sendParent, [reference, Element], [name, String])

        const parent = reference.parentElement?.closest('*:has(> script.octopus)')
        if(!parent){console.warn(OctopusUtils.constant.parentSendNotFound(name), reference); return}

        let parentProps = this.nerveCord.get(parent)

        if(!parentProps){
            parentProps = new OctopusChannelsStorage()
            this.nerveCord.set(parent, parentProps)
        }
        
        parentProps.sendData('upward', name, value)
    }

    static receiveChild(reference: Element, name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = false): void
    {
        OctopusUtils.function.validate(this.receiveChild, [reference, Element], [name, String], [callback, Function], [immediate, Boolean, undefined], [once, Boolean])

        let selfProps = this.nerveCord.get(reference)

        if(!selfProps){
            selfProps = new OctopusChannelsStorage()
            this.nerveCord.set(reference, selfProps)
        }

        selfProps.receiveData('upward', name, callback, immediate, once)
    }

}