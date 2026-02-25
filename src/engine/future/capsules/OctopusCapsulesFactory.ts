import { Input } from '../../../utils/OctopusTypes'
import { OctopusUtils } from '../../../utils/OctopusUtils'
import { OctopusComponent } from '../../OctopusComponent'

import * as Capsules from './OctopusCapsules'

export class OctopusCapsulesFactory {

    static createCapsule(input: Input): Capsules.OctopusCapsule
    {
        if(Array.isArray(input)){
            const template = input[0]
            const data = input[1]

            OctopusUtils.validate(this.createCapsule, [template, OctopusComponent, Element, String], [data, Object])
            return new Capsules.OctopusDataCapsule(template, data)
        }

        OctopusUtils.validate(this.createCapsule, [input, OctopusComponent, Element, String])
        return typeof input === 'string' ? new Capsules.OctopusStringCapsule(input) : new Capsules.OctopusElementCapsule(input)
    }

}