import { OctopusTemplates } from './OctopusTemplates'

export class OctopusAutoProcess {

    constructor(data: any){
        if(!data){console.warn('[Octopus] AutoProcess Error: No data received.'); return}

        if(data.message) OctopusTemplates.generateDialog('message', data.message.content, data.message.classes, data.message.options)

        if(data.error) OctopusTemplates.generateDialog('error', data.error, 'bg-danger')
    }

}