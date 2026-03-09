import { OctopusComponent } from '../periferics/OctopusComponent.ts'
import { OctopusPerformance } from './OctopusPerformance.ts'
import { OctopusUtils } from '../periferics/OctopusUtils.ts'
import { OctopusParser } from './parser/OctopusParser.ts'
import { OctopusFragments } from './OctopusFragments.ts'

import type { Input, Position } from '../periferics/OctopusUtils.ts'

export class OctopusEngine {

    static render(input: Input, position: Position, relative: OctopusComponent|Element): void
    {
        //88888888888888888888888888888888888888888888888888888888888888888
        //const octopusPerformance = new OctopusPerformance()
        //88888888888888888888888888888888888888888888888888888888888888888

        OctopusUtils.function.validate(this.render, [input, OctopusComponent, Element, String, Array], [position, String], [relative, OctopusComponent, Element])

        let [template, data] = this.prepareValues(input)

        //88888888888888888888888888888888888888888888888888888888888888888
        //octopusPerformance.stamp('Prepare Values')
        //88888888888888888888888888888888888888888888888888888888888888888
        
        if(data)
        {
            template = template instanceof Element ? template.innerHTML : template

            const octopusTree = OctopusParser.generateOctopusTree(template)

            //8888888888888888888888888888888888888888888888888888888888888
            //octopusPerformance.stamp('Generate Octopus Tree')
            //8888888888888888888888888888888888888888888888888888888888888

            template = octopusTree.process(template, data)

            //8888888888888888888888888888888888888888888888888888888888888
            //octopusPerformance.stamp('Process Octopus Tree')
            //8888888888888888888888888888888888888888888888888888888888888

        }

        const nodes = template instanceof Element 
                    ? template instanceof HTMLTemplateElement ? template.content : template
                    : OctopusFragments.stringToFragment(template)
        
        //88888888888888888888888888888888888888888888888888888888888888888
        //octopusPerformance.stamp('Prepare Nodes')
        //88888888888888888888888888888888888888888888888888888888888888888

        this.inject(nodes, position, relative)

        //88888888888888888888888888888888888888888888888888888888888888888
        //octopusPerformance.stamp('DOM Inyection').showResults()
        //88888888888888888888888888888888888888888888888888888888888888888
    }

    static prepareValues(input: Input): [Element|string, Record<string, any>|undefined]
    {
        if(!Array.isArray(input)) return [input instanceof OctopusComponent ? input.ref : input, undefined]

        else if(input.length > 1)
        {
            const templateSource = input[0]
            const data = input[1]

            OctopusUtils.function.validate(this.prepareValues, [templateSource, OctopusComponent, Element, String], [data, Object, undefined])

            return [templateSource instanceof OctopusComponent ? templateSource.ref : templateSource, data]
        }
        else throw new TypeError('[Octopus Engine Error] Invalid render arguments')
    }

    static inject(node: Node, position: string = 'default', relative: OctopusComponent|Element): void
    {
        const injection = node.cloneNode(true)

        relative = relative instanceof OctopusComponent ? relative.ref : relative

        switch(position){
            case 'beforebegin': relative.before(injection); break
            case 'afterbegin': relative.prepend(injection); break
            case 'beforeend': relative.append(injection); break
            case 'afterend': relative.after(injection); break
            case 'into': relative.replaceChildren(injection); break
            default: relative.appendChild(injection); break
        }
    }

}