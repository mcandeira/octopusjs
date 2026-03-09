import { OctopusMark } from '../marks/OctopusMark.ts'
import { OctopusMarkInvalid } from '../marks/OctopusMarkInvalid.ts'
import { OctopusTree } from './OctopusTree.ts'
import { OctopusUtils } from '../OctopusUtils.ts'

export class OctopusTreeInvalid extends OctopusTree {

    constructor(mark: OctopusMark){
        super(mark)
        this.closure = new OctopusMarkInvalid(0, 0, 'invalidTree')
    }

    process(template: string, data: Record<string,any>): string
    {
        console.warn(OctopusUtils.constant.invalidTree(this.root.name))

        return template.substring(this.root.start, this.root.end)
    }
    
}