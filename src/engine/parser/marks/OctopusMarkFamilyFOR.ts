import { OctopusMark } from './OctopusMark'
import { MarkType } from '../OctopusUtils'

export abstract class OctopusMarkFOR extends OctopusMark{}

export class OctopusMarkFor extends OctopusMarkFOR {

    element: string
    collection: string

    constructor(start: number, end: number, name: string, element: string, collection: string)
    {
        super(start, end, name, MarkType.open)
        this.element = element
        this.collection = collection
    }
    
}

export class OctopusMarkEndFor extends OctopusMarkFOR {

    constructor(start: number, end: number, name: string){
        super(start, end, name, MarkType.close)
    }

}