export class OctopusTagsFactory {

    static createTag(start: number, end: number, headers: string[])
    {
        return new OctopusTag(start, end, headers)
    }

}

export class OctopusTag {

    start: number
    end: number

    headers: string[]

    closeTag: OctopusTag|undefined

    constructor(start: number, end: number, headers: string[])
    {
        this.start = start
        this.end = end

        this.headers = headers
    }

}