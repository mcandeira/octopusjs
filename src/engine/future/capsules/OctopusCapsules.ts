import { SimpleInput } from '../../../utils/OctopusTypes'
import { OctopusComponent } from '../../OctopusComponent'

export abstract class OctopusCapsule {

    cacheable: boolean

    constructor(cacheable: boolean){
        this.cacheable = cacheable
    }

    hash(): number|string
    {
        const string = this.toString()
        const length = string.length

        if(length < 64) return string

        let hash = 0
        for(let i = 0; i < length; i++){
            hash = Math.imul(31, hash) + string.charCodeAt(i) | 0
        }
        return hash
    }
    
    abstract toString(): string
}

export class OctopusElementCapsule extends OctopusCapsule {

    content: Element

    constructor(content: OctopusComponent|Element){
        super(false)
        this.content = content instanceof OctopusComponent ? content.ref : content
    }

    toString(): string
    {
        return this.content.outerHTML
    }

}

export class OctopusStringCapsule extends OctopusCapsule {

    content: string

    constructor(content: string, cacheable: boolean = true){
        super(cacheable)
        this.content = content
    }

    toString(): string
    {
        return this.content
    }

}

export class OctopusDataCapsule extends OctopusCapsule {

    content: string
    data: Record<string, any>

    constructor(content: SimpleInput, data: Record<string, any>, cacheable: boolean = true){
        super(cacheable)
        this.content = content instanceof OctopusComponent ? content.ref.innerHTML : content instanceof Element ? content.innerHTML : content
        this.data = data
    }

    toString(): string
    {
        return `${this.content}${this.data ? JSON.stringify(this.data) : ''}`
    }

}