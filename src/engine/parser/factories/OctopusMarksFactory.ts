import * as Marks from '../marks'

export class OctopusMarksFactory {

    private static readonly REGEX_SPACES: RegExp = /\s+/

    static createMark(start: number, end: number, content: string): Marks.OctopusMark
    {
        if(end < start) return new Marks.OctopusMarkInvalid(start, end)

        const cleanContent = content.trim()
        if(!cleanContent) return new Marks.OctopusMarkInvalid(start, end)
        
        const [first, ...rest] = cleanContent.split(this.REGEX_SPACES)
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
                return new Marks.OctopusMarkInvalid(start, end)
        }
    }

    private static createMarkIf(start: number, end: number, name: string, headers: string[]): Marks.OctopusMark
    {
        switch(name){
            case 'if':
                if(headers.length < 1) return new Marks.OctopusMarkInvalid(start, end)
                return new Marks.OctopusMarkIf(start, end, name, headers[0])
            case 'elseif':
                if(headers.length < 1) return new Marks.OctopusMarkInvalid(start, end)
                return new Marks.OctopusMarkElseIf(start, end, name, headers[0])
            case 'else':
                return new Marks.OctopusMarkElse(start, end, name)
            case 'endif':
                return new Marks.OctopusMarkEndIf(start, end, name)
            default:
                return new Marks.OctopusMarkInvalid(start, end)
        }
    }

    private static createMarkFor(start: number, end: number, name: string, headers: string[]): Marks.OctopusMark
    {
        switch(name){
            case 'for':
                if(headers.length < 3) return new Marks.OctopusMarkInvalid(start, end)
                return new Marks.OctopusMarkFor(start, end, name, headers[0], headers[2])
            case 'endfor':
                return new Marks.OctopusMarkEndFor(start, end, name)
            default:
                return new Marks.OctopusMarkInvalid(start, end)
        }
    }

}