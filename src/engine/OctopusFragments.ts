import { OctopusCache } from './OctopusCache.ts'

export class OctopusFragments {

    static readonly cache: OctopusCache = new OctopusCache()

    static stringToFragment(string: string): DocumentFragment
    {
        return this.cache.process(string, (string: string): DocumentFragment => OctopusFragments.buildFragment(string))
    }

    private static buildFragment(string: string): DocumentFragment
    {
        const template = document.createElement('template')
        template.innerHTML = string
        if(string.includes('<script')) this.fixScripts(template.content)
        return template.content
    }

    private static fixScripts(fragment: DocumentFragment)
    {
        for(const element of fragment.querySelectorAll('template, script')){
            if(element instanceof HTMLTemplateElement) this.fixScripts(element.content)
            else{
                const workingScript = document.createElement('script')
                Array.from(element.attributes).forEach((attr:any) => workingScript.setAttribute(attr.name, attr.value))
                workingScript.type = 'module'
                workingScript.textContent = element.textContent
                element.replaceWith(workingScript)
            }
        }
    }

}