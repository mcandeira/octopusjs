import { OctopusMark } from './OctopusMark.ts'
import { MarkType } from '../OctopusUtils.ts'

export abstract class OctopusMarkFOR extends OctopusMark{}

export class OctopusMarkFor extends OctopusMarkFOR {

    iteration: string

    constructor(start: number, end: number, name: string, iteration: string)
    {
        super(start, end, name, MarkType.open)
        this.iteration = iteration
    }
    
}

export class OctopusMarkEndFor extends OctopusMarkFOR {

    constructor(start: number, end: number, name: string){
        super(start, end, name, MarkType.close)
    }

}