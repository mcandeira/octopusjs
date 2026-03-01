export class OctopusCache {

    private softStorage: Map<number|string, any|undefined>

    private hardStorage: Map<number, Map<number, any>>

    constructor()
    {
        this.softStorage = new Map()
        this.hardStorage = new Map()
    }

    process(string: string, processor: Function): any
    {
        const length = string.length

        if(length > 10000) return this.hardProcess(string, processor)

        const cache = this.softStorage
        
        const cacheID = length < 64 ? string : this.stringToHash(string)

        if(!cache.has(cacheID))
        {
            const result = processor(string)
            cache.set(cacheID, undefined)
            return result
        }

        const cached = cache.get(cacheID)
        if(cached) return cached

        const result = processor(string)
        cache.set(cacheID, result)
        return result
    }
    
    private hardProcess(string: string, processor: Function): any
    {
        const length = string.length

        const cache = this.hardStorage

        if(!cache.has(length)){
            const result = processor(string)
            cache.set(length, new Map())
            return result
        }

        const secondLevel = cache.get(length)

        const cacheID = this.stringToHash(string)

        if(!secondLevel?.size){
            const result = processor(string)
            secondLevel?.set(cacheID, result)
            return result
        }

        const cached = secondLevel.get(cacheID)
        if(cached) return cached

        const result = processor(string)
        secondLevel.set(cacheID, result)
        return result
    }

    private stringToHash(string: string): number
    {
        let hash = 5381

        for(let i = 0; i < length; i++){
            hash = ((hash << 5) + hash) + string.charCodeAt(i)
        }
        
        return hash >>> 0
    }

}