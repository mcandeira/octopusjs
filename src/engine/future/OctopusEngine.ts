// import { Input } from '../../utils/OctopusTypes'
// import { Capsules, CapsulesFactory} from './capsules/index'
// import { OctopusFragments } from './engine/OctopusFragments'
// import { OctopusCache } from './engine/OctopusCache'
// import { OctopusParser } from './engine/OctopusParser'
// import { OctopusTree } from './trees/OctopusTree'

// //import { OctopusPerformance } from '../../utils/OctopusPerformance'

// export class OctopusEngine {

//     static process(input: Input): Node
//     {
//         const capsule = CapsulesFactory.createCapsule(input)

//         if(capsule instanceof Capsules.OctopusDataCapsule) return this.processDataInput(capsule)

//         if(capsule instanceof Capsules.OctopusElementCapsule){
//             const element = capsule.content
//             return element instanceof HTMLTemplateElement ? element.content.cloneNode(true) : element.cloneNode(true)
//         }

//         if(capsule instanceof Capsules.OctopusStringCapsule) return OctopusFragments.stringToFragment(capsule)
        
//         throw TypeError(`Bad logic in 'OctopusEngine.process'.`)
//     }

//     static processDataInput(capsule: Capsules.OctopusDataCapsule): Node
//     {
//         //const octopusPerformance = new OctopusPerformance()

//         const octopusTree = OctopusCache.process(new Capsules.OctopusStringCapsule(capsule.content), OctopusParser.generateOctopusTree) as OctopusTree
//         //octopusPerformance.stamp('octopusTree')

//         const processedTree = octopusTree.process(capsule.data)
//         //octopusPerformance.stamp('processedTree')

//         const fragment = OctopusCache.process(processedTree, OctopusFragments.stringToFragment)
//         //octopusPerformance.stamp('fragment')
//         //octopusPerformance.showResults()

//         return fragment
//     }

// }