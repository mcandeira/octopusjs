import { OctopusComponent } from '../periferics/OctopusComponent'

export const OctopusUtils = {

    constant:
    {
        requestError: '[Octopus] Request Error:',

        autoProcessError: '[Octopus] AutoProcess Error: Invalid data received.',

        dialogTemplateNotFound: '[Octopus] Dialog Error: Template "#octopusDialogTemplate" not found.'
    },

    function:
    {
        generateDialog(id: string, message: string, classes: string = '', options: string[]|undefined = undefined): void
        {
            const body = new OctopusComponent('body')
            const dialog = body.getChild('#octopusDialogTemplate')

            if(!dialog){console.warn(OctopusUtils.constant.dialogTemplateNotFound); return}

            id = `${id}Dialog`

            const existing = body.getChild(`#${id}`)
            if(existing) existing.use('remove')
            body.render([dialog, {message, classes, options, id}])
            body.getChild(`#${id}`)?.use('showModal')
        }
    }

} as const