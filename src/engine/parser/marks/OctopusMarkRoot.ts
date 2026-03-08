import { OctopusMark } from './OctopusMark.ts'
import { MarkType } from '../OctopusUtils.ts'

export class OctopusMarkRoot extends OctopusMark {

    constructor(){
        super(0, 0, 'root', MarkType.special)
    }

}