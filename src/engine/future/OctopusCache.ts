import { OctopusCapsule } from '../capsules/OctopusCapsules'

const cache: Map<string|number, {cacheable: boolean}|undefined> = new Map()

export class OctopusCache {

    static process(capsule: OctopusCapsule, processor: Function): any
    {
        if(!capsule.cacheable) return processor(capsule)

        const cachedID = capsule.hash()

        if(!cache.has(cachedID))
        {
            const result = processor(capsule)

            if(result?.cacheable) cache.set(cachedID, undefined)

            return result
        }

        const cached = cache.get(cachedID)
        if(cached) return cached

        const result = processor(capsule)

        if(result?.cacheable) cache.set(cachedID, result)
            
        return result
    }

}