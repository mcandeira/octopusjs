export class OctopusTemplates {

    static getTemplates(): string
    {
        return `
            <div id="octopusTemplates">
                ${this.octopusDialogTemplate()}
            </div>
        `
    }

    private static octopusDialogTemplate(): string
    {
        return `
            <template id="octopusDialogTemplate">
                <dialog id="{{ id }}" class="{{ classes }}">
                    <div>
                        {{ message }}
                        8{for option in options}
                            {{ option }}
                        8{endfor}
                        <button>Close</button>
                    </div>

                    <script type="module">
                        import { octopus } from 'octopus-js-native'

                        const component = octopus.getComponent('#{{ id }}')
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