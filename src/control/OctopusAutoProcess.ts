import { OctopusUtils } from './OctopusUtils'

export class OctopusAutoProcess {

    constructor(data: any){
        if(!data || typeof data !== 'object'){console.error(OctopusUtils.constant.autoProcessError); return}
        
        if(data instanceof Error){OctopusUtils.function.generateDialog('error', data.message, 'bg-danger'); return}

        if(data.message) OctopusUtils.function.generateDialog('message', data.message.content ?? data.message, data.message.classes, data.message.options)

        if(data.error) OctopusUtils.function.generateDialog('error', data.error, 'bg-danger')
    }

}