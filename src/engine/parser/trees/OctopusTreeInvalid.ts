import { OctopusTree } from './OctopusTree'

export class OctopusTreeInvalid extends OctopusTree {

    process(data?: Record<string,any>): string
    {
        return ''
    }
    
}