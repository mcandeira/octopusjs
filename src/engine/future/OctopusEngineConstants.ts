import { MarkType } from './OctopusTypes'

export const OctopusConstants = {
    
    engine:
    {
        eyes:
        {
            startDelimiter: '8{',
            endDelimiter: '}',

            incompleteTag: '[Octopus Parser Error] Incomplete tag in: ',
            undefinedTag: '[Octopus Parser Error] Unknown tag in: ',
            unclosedTag: '[Octopus Parser Error] Unclosed tag in: ',
            unopenedTag: '[Octopus Parser Error] Unopened tag in: ',
            undefinedTree: '[Octopus Parser Error] Unknown tree in: ',
        },

        validMarks:
        {
            if: MarkType.open,
            elseif: MarkType.inline,
            else: MarkType.inline,
            endif: MarkType.close,

            for: MarkType.open,
            endfor: MarkType.close,
        }
    },

    

} as const