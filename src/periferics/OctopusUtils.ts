import { OctopusComponent } from './OctopusComponent'

export type SimpleInput = string|Element|OctopusComponent

export type Input = SimpleInput|[SimpleInput, Record<string,any>]

export type Selector = string|Element|undefined

export const OctopusUtils = {

    constant:
    {
        methodNotExist: '[Octopus] The HTMLElement method does not exist:',
        notHimself: '[Octopus] The "into" option requires a relative element different from himself.',

        unOverriddenValue: '[Octopus] The value cannot be overridden: ',
        unOverriddenHelper: '[Octopus] The helper cannot be overridden: ',
        unOverriddenAction: '[Octopus] The action cannot be overridden: ',
        unOverriddenProp: '[Octopus] The prop cannot be overridden: ',
        unOverriddenChild: '[Octopus] The child receiver cannot be overridden: ',

        parentPropNotFound: '[Octopus] Parent not found for prop: ',
        parentListenerNotFound: '[Octopus] Parent not found for listener: ',
    },

    function:
    {
        validate(caller: Function, ...params: any[][]): void
        {
            const paramsLength = params.length

            for(let position = 0; position < paramsLength; position++){

                const [value, ...types] = params[position]

                if(types.length === 0) throw new Error(OctopusUtils.function.invalidValidateArguments(caller.name, position + 1))

                let matches = false
                for(const type of types){
                    if((type === undefined || type === null) && type === value || type && Object(value) instanceof type){matches = true; break}
                }

                if(!matches){
                    const valueName = value?.constructor?.name ?? typeof value
                    const typeNames = types.map(type => type?.name ?? String(type)).join(' | ')

                    throw new TypeError(OctopusUtils.function.invalidArgumentType(caller.name, position + 1, valueName, typeNames))
                }
                
            }
        },

        invalidValidateArguments(method: string, position: number): string
        {
            return `[Octopus Error] Invalid validate arguments in: ${method}, parameter position '${position}'. Expected at least one value and one check type`
        },

        invalidArgumentType(method: string, position: number, param: string, expected: string): string
        {
            return `[Octopus Error] Invalid argument type in: ${method}, parameter position '${position}'. Expected: ${expected}, got ${param}.`
        }
    }

} as const