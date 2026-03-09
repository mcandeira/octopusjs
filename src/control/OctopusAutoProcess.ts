import { OctopusNervousSystem } from '../periferics/nervous/OctopusNervousSystem.ts';
import { OctopusUtils } from './OctopusUtils.ts'

export class OctopusAutoProcess {

    constructor(data: any){
        if(!data || typeof data !== 'object'){console.error(OctopusUtils.constant.autoProcessError(this.constructor.name)); return}
        
        if(data instanceof Error){OctopusUtils.function.generateDialog('error', data.message, 'bg-danger'); return}

        if(data.message) OctopusUtils.function.generateDialog('message', data.message.content, data.message.classes, data.message.options)

        if(data.error) OctopusUtils.function.generateDialog('error', data.error, 'bg-danger')

        if(data.remember){
            localStorage.setItem(data.remember.key, data.remember.value)
            OctopusNervousSystem.triggerAction('refresh')
        }

        if(data.forget){
            localStorage.removeItem(data.forget.key)
            OctopusNervousSystem.triggerAction('refresh')
        }

        if(data.reload) location.reload()
    }

}