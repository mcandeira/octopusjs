import * as Mark from '../marks'
import * as Tree from '../trees'

export class OctopusTreesFactory {

    static createTree(root: Mark.OctopusMark): Tree.OctopusTree
    {
        if(root instanceof Mark.OctopusMarkIf) return new Tree.OctopusTreeIf(root)

        if(root instanceof Mark.OctopusMarkFor) return new Tree.OctopusTreeFor(root)
            
        return new Tree.OctopusTreeInvalid(root)
    }

}