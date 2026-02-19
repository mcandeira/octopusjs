import { OctopusFunctions } from '../utils/OctopusFunctions'

export class OctopusAutoProcess {

    constructor(data: any){
        if(!data){console.warn('[Octopus] AutoProcess Error: No data received.'); return}

        if(data.message) OctopusFunctions.generateDialog('message', data.message.content, data.message.classes, data.message.options)

        if(data.error) OctopusFunctions.generateDialog('error', data.error, 'bg-danger')
    }

}