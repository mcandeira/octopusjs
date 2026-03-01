import { OctopusMark } from './OctopusMark'
import { MarkType } from '../OctopusUtils'

export class OctopusMarkRoot extends OctopusMark {

    constructor(){
        super(0, 0, 'root', MarkType.special)
    }

}