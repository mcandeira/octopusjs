import { OctopusComponent } from '../periferics/OctopusComponent'

export const OctopusUtils = {

    error: (message: string): string => `[Octopus Control Error] ${message}`,

    constant:
    {
        requestError: (error: string): string => OctopusUtils.error(`Request: ${error}`),

        autoProcessError: (method: string): string => OctopusUtils.error(`Invalid data received in ${method}.`),

        dialogTemplateNotFound: (method: string): string => OctopusUtils.error(`Template "#octopusDialogTemplate" not found in ${method}.`)
    },

    function:
    {
        generateDialog(id: string, message: string, classes: string = '', options: string[]|undefined = undefined): void
        {
            const body = new OctopusComponent('body')
            const dialog = body.getChild('#octopusDialogTemplate')

            if(!dialog){console.warn(OctopusUtils.constant.dialogTemplateNotFound(OctopusUtils.function.generateDialog.name)); return}

            id = `${id}Dialog`

            const existing = body.getChild(`#${id}`)
            if(existing) existing.use('remove')

            body.render([dialog, {message, classes, options, id}])
            body.getChild(`#${id}`)?.use('showModal')
        }
    }

} as const