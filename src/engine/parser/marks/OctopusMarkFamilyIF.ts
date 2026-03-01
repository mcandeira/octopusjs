import { OctopusMark } from './OctopusMark'
import { MarkType } from '../OctopusUtils'

export abstract class OctopusMarkIF extends OctopusMark{}

export class OctopusMarkIf extends OctopusMarkIF {

    condition: string

    constructor(start: number, end: number, name: string, condition: string)
    {
        super(start, end, name, MarkType.open)
        this.condition = condition
    }
    
}

export class OctopusMarkElseIf extends OctopusMarkIF {

    condition: string

    constructor(start: number, end: number, name: string, condition: string)
    {
        super(start, end, name, MarkType.inline)
        this.condition = condition
    }

}

export class OctopusMarkElse extends OctopusMarkIF {

    condition: string

    constructor(start: number, end: number, name: string){
        super(start, end, name, MarkType.inline)
        this.condition = 'else'
    }

}

export class OctopusMarkEndIf extends OctopusMarkIF {

    constructor(start: number, end: number, name: string){
        super(start, end, name, MarkType.close)
    }

}