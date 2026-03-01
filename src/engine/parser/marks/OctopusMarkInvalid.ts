import { OctopusMark } from './OctopusMark'
import { MarkType } from '../OctopusUtils'

export class OctopusMarkInvalid extends OctopusMark {

    constructor(start: number, end: number){
        super(start, end, 'invalid', MarkType.special)
    }

}