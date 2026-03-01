import { OctopusComponent } from './OctopusComponent'

export type Selector = string|Element|undefined

export type SimpleInput = OctopusComponent|Element|string
export type Input = SimpleInput|[SimpleInput, Record<string,any>]

export type Position = 'beforebegin'|'afterbegin'|'beforeend'|'afterend'|'into'|'default'

export const OctopusUtils = {

    error: (message: string): string => `[Octopus Periferic Error] ${message}`,

    constant:
    {
        methodNotExist: (method: string): string => OctopusUtils.error(`The "${method}" HTMLElement method does not exist.`),
        notHimself: () => OctopusUtils.error(`The "into" option requires a relative element different from himself.`),

        unOverriddenValue: (value: string): string => OctopusUtils.error(`The "${value}" value cannot be overridden.`),
        unOverriddenHelper: (helper: string): string => OctopusUtils.error(`The "${helper}" helper cannot be overridden.`),
        unOverriddenAction: (action: string): string => OctopusUtils.error(`The ${action} action cannot be overridden.`),
        unOverriddenProp: (prop: string): string => OctopusUtils.error(`The ${prop} prop cannot be overridden.`),
        unOverriddenListener: (listener: string): string => OctopusUtils.error(`The "${listener}" child listener cannot be overridden.`),

        parentPropNotFound: (prop: string): string => OctopusUtils.error(`Prop "${prop}" parent not found.`),
        parentListenerNotFound: (listener: string): string => OctopusUtils.error(`Listener "${listener}" parent not found.`),

        invalidValidateArguments: (method: string, position: number): string => 
        {
            return OctopusUtils.error(`Invalid validate arguments in: ${method}, parameter position '${position}'. Expected at least one value and one check type.`)
        },

        invalidArgumentType: (method: string, position: number, param: string, expected: string): string =>
        {
            return OctopusUtils.error(`Invalid argument type in: ${method}, parameter position '${position}'. Expected: ${expected}, got ${param}.`)
        }
    },

    function:
    {
        validate(caller: Function, ...params: any[][]): void
        {
            const paramsLength = params.length

            for(let position = 0; position < paramsLength; position++){

                const [value, ...types] = params[position]

                if(types.length === 0) throw new Error(OctopusUtils.constant.invalidValidateArguments(caller.name, position + 1))

                let matches = false
                for(const type of types){
                    if((type === undefined || type === null) && type === value || type && Object(value) instanceof type){matches = true; break}
                }

                if(!matches){
                    const valueName = value?.constructor?.name ?? typeof value
                    const typeNames = types.map(type => type?.name ?? String(type)).join(' | ')

                    throw new TypeError(OctopusUtils.constant.invalidArgumentType(caller.name, position + 1, valueName, typeNames))
                }
                
            }
        },
    }

} as const