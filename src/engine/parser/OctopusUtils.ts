export enum MarkType {special, inline, open, close}

export const OctopusUtils = {

    error: (message: string): string => `[Octopus Parser Error] ${message}`,

    constant:
    {
        startDelimiter: '8{',
        endDelimiter: '}',

        REGEX_VARS: /\{\{([^}]+)\}\}/g,
   
        unknownMark: (mark: string): string => OctopusUtils.error(`Mark "${mark} unknown."`)
        //incompleteTag: '[Octopus Parser Error] Incomplete tag in: ',
        //unclosedTag: '[Octopus Parser Error] Unclosed tag in: ',
        //unopenedTag: '[Octopus Parser Error] Unopened tag in: ',
        //undefinedTree: '[Octopus Parser Error] Unknown tree in: ',
        //lastUnclosedTree: (tree: string): string => OctopusUtils.error(`Last "${tree}" tree unclosed.`),
    },

    function:
    {
        resolveValue(path: string, source: Record<string, any>): any
        {
            if (!path) return false;
            let current = source;
            let start = 0;
            
            for (let i = 0; i <= path.length; i++) {
                if (i === path.length || path[i] === '.') {
                    const key = path.substring(start, i);
                    current = current?.[key];
                    if (current === undefined) return undefined;
                    start = i + 1;
                }
            }
            return current;
        },

        escapeHTML(str: string): string
        {
            if (typeof str !== 'string') return str
            return str.replace(/[&<>"']/g, m => (m === '&' ? '&amp;' : m === '<' ? '&lt;' : m === '>' ? '&gt;' : m === '"' ? '&quot;' : '&#39;'))
        }
    }

} as const