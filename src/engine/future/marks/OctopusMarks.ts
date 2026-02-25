import { MarkType } from '../../../utils/OctopusTypes'

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

/* =====================================================================
    OCTOPUS SPECIAL MARKS
   ===================================================================== */

export class OctopusMarkRoot extends OctopusMark {

    constructor(){
        super(0, 0, 'root', MarkType.special)
    }

}

export class OctopusMarkInvalid extends OctopusMark {

    constructor(start: number, end: number){
        super(start, end, 'invalid', MarkType.special)
    }

}

/* =====================================================================
    OCTOPUS IF MARKS
   ===================================================================== */

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

/* =====================================================================
    OCTOPUS FOR MARKS
   ===================================================================== */

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