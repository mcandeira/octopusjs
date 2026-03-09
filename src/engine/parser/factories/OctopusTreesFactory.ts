import { OctopusMark } from '../marks/OctopusMark.ts'
import { OctopusMarkIf } from '../marks/OctopusMarkFamilyIF.ts'
import { OctopusMarkFor } from '../marks/OctopusMarkFamilyFOR.ts'
import { OctopusTree } from '../trees/OctopusTree.ts'
import { OctopusTreeIf } from '../trees/OctopusTreeIf.ts'
import { OctopusTreeFor } from '../trees/OctopusTreeFor.ts'
import { OctopusTreeInvalid } from '../trees/OctopusTreeInvalid.ts'

export class OctopusTreesFactory {

    static createTree(root: OctopusMark): OctopusTree
    {
        if(root instanceof OctopusMarkIf) return new OctopusTreeIf(root)

        if(root instanceof OctopusMarkFor) return new OctopusTreeFor(root)
            
        return new OctopusTreeInvalid(root)
    }

}