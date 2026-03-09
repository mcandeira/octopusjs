import { OctopusMark } from './OctopusMark.ts'
import { MarkType } from '../OctopusUtils.ts'

export class OctopusMarkInvalid extends OctopusMark {

    constructor(start: number, end: number, content: string){
        super(start, end, `8{${content}}`, MarkType.special)
    }

}