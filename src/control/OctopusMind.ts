import { OctopusComponent } from '../periferics/OctopusComponent'
import { OctopusTemplates } from './OctopusTemplates'
import { OctopusRequest } from './OctopusRequest'

export class OctopusMind {

    static takeControl(): void
    {
        const body = new OctopusComponent('body')
        body.render(OctopusTemplates.getTemplates())

        body.use('addEventListener', 'submit', (e: Event) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            new OctopusRequest(form.action, new FormData(form)).autoprocess()
        })
    }

}