import { Marks } from '../marks/index'
import { OctopusTree } from './OctopusTree'
import { OctopusTreeIf } from './OctopusTreeIf'
import { OctopusTreeFor } from './OctopusTreeFor'
import { OctopusTreeInvalid } from './OctopusTreesSpecial'

export class OctopusTreesFactory {

    static createTree(root: Marks.OctopusMark): OctopusTree
    {
        if(root instanceof Marks.OctopusMarkIf) return new OctopusTreeIf(root)

        if(root instanceof Marks.OctopusMarkFor) return new OctopusTreeFor(root)
            
        return new OctopusTreeInvalid(root)
    }

}