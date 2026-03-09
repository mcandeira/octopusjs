import { OctopusMark } from './OctopusMark.ts'
import { MarkType } from '../OctopusUtils.ts'

export abstract class OctopusMarkIF extends OctopusMark{

    condition: string

    constructor(start: number, end: number, name: string, type: MarkType, condition: string = '')
    {
        super(start, end, name, type)
        this.condition = condition
    }

}

export class OctopusMarkIf extends OctopusMarkIF {

    constructor(start: number, end: number, name: string, condition: string)
    {
        super(start, end, name, MarkType.open, condition)
    }
    
}

export class OctopusMarkElseIf extends OctopusMarkIF {

    constructor(start: number, end: number, name: string, condition: string)
    {
        super(start, end, name, MarkType.inline, condition)
    }

}

export class OctopusMarkElse extends OctopusMarkIF {

    constructor(start: number, end: number, name: string){
        super(start, end, name, MarkType.inline)
    }

}

export class OctopusMarkEndIf extends OctopusMarkIF {

    constructor(start: number, end: number, name: string){
        super(start, end, name, MarkType.close)
    }

}