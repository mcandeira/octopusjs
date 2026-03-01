import { OctopusCache } from './OctopusCache'

export class OctopusFragments {

    static readonly cache: OctopusCache = new OctopusCache()

    static stringToFragment(string: string): DocumentFragment
    {
        const fragment = this.cache.process(string, (string: string): DocumentFragment => OctopusFragments.generateFragment(string))
        return fragment.cloneNode(true)
    }

    static generateFragment(string: string): DocumentFragment
    {
        const template = document.createElement('template')
        template.innerHTML = string
        if(string.includes('<script')) this.fixScripts(template.content)
        return template.content
    }

    static fixScripts(fragment: DocumentFragment)
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