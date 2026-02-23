import { OctopusComponent } from '../periferics/OctopusComponent'

export class OctopusTemplates {

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

    static getTemplates(){
        return `
            <div id="octopusTemplates">
                ${this.#templateOctopusDialog()}
            </div>
        `
    }

    static #templateOctopusDialog(){
        return `
            <template id="octopusDialogTemplate">
                <dialog id="{{ dialogID }}" class="{{ classes }}">
                    <div>
                        {{ message }}
                        8{for option in options}
                            {{ option }}
                        8{endfor}
                        <button>Close</button>
                    </div>

                    <script type="module">
                        import { octopus } from 'octopus-js-native'

                        const component = octopus.getComponent('#{{ dialogID }}')
                        const button = component.getChild('button')

                        button.use('addEventListener', 'click', () => {
                            component.use('close')
                            component.use('remove')
                        })
                    </script>

                    <style>
                        @scope{
                            >div{
                                display: flex;
                                flex-direction: column;
                            }
                        }
                    </style>
                </dialog>
            </template>
        `
    }

}