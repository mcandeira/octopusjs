import { OctopusComponent } from '../core/OctopusComponent'

export class OctopusFunctions {

    static generateDialog(id: any, message: any, classes: any, options = null){
        id = `${id}Dialog`
        const body = new OctopusComponent('body')
        const dialog = body.getChild('#octopusDialogTemplate')
        if(!dialog){console.warn('[Octopus] Dialog Error: Template "#octopusDialogTemplate" not found.'); return}
        const existing = body.getChild(`#${id}`)
        if(existing) existing.use('remove')
        body.render([dialog, {message, classes, options, 'dialogID': id}])
        body.getChild(`#${id}`)?.use('showModal')
    }

}