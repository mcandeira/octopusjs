export enum MarkType {special, inline, open, close}

export const OctopusUtils = {

    error: (message: string): string => `[Octopus Parser Error] ${message}`,

    constant:
    {
        startDelimiter: '8{',
        endDelimiter: '}',

        REGEX_VARS: /\{\{([^}]+)\}\}/g,
   
        lastUnclosedMark: (): string => OctopusUtils.error(`Last tag unclosed.`),
        invalidMark: (mark: string): string => OctopusUtils.error(`Tag "${mark}" invalid.`),
        unopenedMark: (mark: string): string => OctopusUtils.error(`Tag "${mark}" unopened.`),
        invalidTree: (tree: string): string => OctopusUtils.error(`Tag "${tree}" invalid.`),
        unclosedTree: (tree: string): string => OctopusUtils.error(`Tag "${tree}" unclosed.`),
    },

    function:
    {
        resolveValue(path: string, source: Record<string, any>): any
        {
            if (!path) return undefined;
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

        evaluateCondition(condition: string, data: Record<string, any>): boolean 
        {
            if(!condition) return false

            try
            {
                const evaluator = new Function(...Object.keys(data), `return ${condition}`)

                return !!evaluator(...Object.values(data))
            }
            catch(error){console.warn(OctopusUtils.error(`Syntax error evaluating condition: "${condition}"`), error)}

            return false
        },

        interpolate(text: string, data: Record<string, any>): string 
        {
            return text.replace(OctopusUtils.constant.REGEX_VARS, (_, key) => {
                const cleanKey = key.trim();
                
                const isRaw = cleanKey.startsWith('raw ');
                
                const actualKey = isRaw ? cleanKey.slice(4).trim() : cleanKey
                
                const value = OctopusUtils.function.resolveValue(actualKey, data)
                
                if(value === undefined || value === null) return ''
                
                return isRaw ? String(value) : OctopusUtils.function.escapeHTML(String(value));
            })
        },

        escapeHTML(str: string): string
        {
            if (typeof str !== 'string') return str
            return str.replace(/[&<>"']/g, m => (m === '&' ? '&amp;' : m === '<' ? '&lt;' : m === '>' ? '&gt;' : m === '"' ? '&quot;' : '&#39;'))
        },
    }

} as const