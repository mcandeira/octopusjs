import { MarkType } from '../OctopusUtils'

export abstract class OctopusMark {

    start: number
    end: number
    name: string
    type: MarkType

    constructor(start: number, end: number, name: string, type: MarkType)
    {
        this.start = start
        this.end = end
        this.name = name
        this.type = type
    }

}