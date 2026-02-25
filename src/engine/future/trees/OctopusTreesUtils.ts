export class OctopusTreesUtils {

    static readonly REGEX_VARS: RegExp = /\{\{([^}]+)\}\}/g

    static resolveValue(path: string, source: Record<string, any>): any
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
    }

    static escapeHTML(str: string) {
        if (typeof str !== 'string') return str
        return str.replace(/[&<>"']/g, m => (m === '&' ? '&amp;' : m === '<' ? '&lt;' : m === '>' ? '&gt;' : m === '"' ? '&quot;' : '&#39;'))
    }

}