import { OctopusMark } from "../marks/OctopusMark.ts"
import { OctopusMarkInvalid } from "../marks/OctopusMarkInvalid.ts"
import { OctopusMarkIf } from "../marks/OctopusMarkFamilyIF.ts"
import { OctopusMarkElseIf } from "../marks/OctopusMarkFamilyIF.ts"
import { OctopusMarkElse } from "../marks/OctopusMarkFamilyIF.ts"
import { OctopusMarkEndIf } from "../marks/OctopusMarkFamilyIF.ts"
import { OctopusMarkFor } from "../marks/OctopusMarkFamilyFOR.ts"
import { OctopusMarkEndFor } from "../marks/OctopusMarkFamilyFOR.ts"

export class OctopusMarksFactory {

    private static readonly REGEX_SPACES: RegExp = /\s+/

    static createMark(start: number, end: number, header: string): OctopusMark
    {
        const cleanHeader = header.trim()
        if(!cleanHeader) return new OctopusMarkInvalid(start, end, header)
        
        const [first, ...rest] = cleanHeader.split(this.REGEX_SPACES)
        switch(first){
            case 'if':
            case 'elseif':
            case 'else':
            case 'endif':
                return this.createMarkIf(start, end, first, rest)
            case 'for':
            case 'endfor':
                return this.createMarkFor(start, end, first, rest)
            default:
                return new OctopusMarkInvalid(start, end, header)
        }
    }

    private static createMarkIf(start: number, end: number, name: string, headers: string[]): OctopusMark
    {
        switch(name){
            case 'if':
                return headers.length > 0 ? new OctopusMarkIf(start, end, name, headers.join(' ')) :
                                            new OctopusMarkInvalid(start, end, `${name} ${headers.join(' ')}`)
            case 'elseif':
                return headers.length > 0 ? new OctopusMarkElseIf(start, end, name, headers.join(' ')) :
                                            new OctopusMarkInvalid(start, end, `${name} ${headers.join(' ')}`)
            case 'else':
                return new OctopusMarkElse(start, end, name)
            case 'endif':
                return new OctopusMarkEndIf(start, end, name)
            default:
                return new OctopusMarkInvalid(start, end, `${name} ${headers.join(' ')}`)
        }
    }

    private static createMarkFor(start: number, end: number, name: string, headers: string[]): OctopusMark
    {
        switch(name){
            case 'for':
                return headers.length > 2 ? new OctopusMarkFor(start, end, name, headers.join(' ')) :
                                            new OctopusMarkInvalid(start, end, `${name} ${headers.join(' ')}`)
            case 'endfor':
                return new OctopusMarkEndFor(start, end, name)
            default:
                return new OctopusMarkInvalid(start, end, `${name} ${headers.join(' ')}`)
        }
    }

}