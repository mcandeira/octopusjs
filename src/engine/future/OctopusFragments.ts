import { OctopusStringCapsule } from "../capsules/OctopusCapsules";

export class OctopusFragments {

    static stringToFragment(string: OctopusStringCapsule): Node
    {

    }
}




// export class OctopusEngine {

//     static stringToTemplate(string:any){
//         let template = document.createElement('template')
//         template.innerHTML = string
//         OctopusTemplates.fixScripts(template)
//         return template
//     }

//     static fixScripts(template:any){
//         const content = template.content

//         for(const innerTemplate of content.querySelectorAll('template')) OctopusTemplates.fixScripts(innerTemplate)

//         for(const script of content.querySelectorAll('script')){
//             const workingScript = document.createElement('script')
//             Array.from(script.attributes).forEach((attr:any) => workingScript.setAttribute(attr.name, attr.value))
//             workingScript.type = 'module'
//             workingScript.textContent = script.textContent
//             script.replaceWith(workingScript)
//         }
//     }

// }


// import { StringCapsule } from "../utils/OctopusTypes";

// export class OctopusFragmentHeart {

//     static stringToFragment(stringCapsule: StringCapsule): DocumentFragment
//     {
//         return document.createElement('template').content
//     }

// }
// // static stringToFragment(string){
// //         const template = document.createElement('template')
// //         template.innerHTML = string
// //         if(string.includes('<script')) OctopusEngine.fixScripts(template.content)
// //         //return template.content
// //         return template
// //     }

// //     static fixScripts(fragment){
// //         for(const element of fragment.querySelectorAll('template, script')){
// //             if(element instanceof HTMLTemplateElement) OctopusEngine.fixScripts(element.content)
// //             else{
// //                 const workingScript = document.createElement('script')
// //                 Array.from(element.attributes).forEach(attr => workingScript.setAttribute(attr.name, attr.value))
// //                 workingScript.type = 'module'
// //                 workingScript.textContent = element.textContent
// //                 element.replaceWith(workingScript)
// //             }
// //         }
// //     }


// //     static stringToTemplate(string){
// //         let template = document.createElement('template')
// //         template.innerHTML = string
// //         if(string.indexOf('<script') > -1) OctopusTemplates.fixScripts(template)
// //         return template
// //     }

// //     static fixScripts(template){
// //         for(const child of template.content.children){
// //             for(const innerTemplate of child.querySelectorAll('template')) OctopusTemplates.fixScripts(innerTemplate)

// //             for(const script of child.querySelectorAll('script')){
// //                 const workingScript = document.createElement('script')
// //                 workingScript.type = 'module'
// //                 workingScript.textContent = script.textContent
// //                 child.replaceChild(workingScript, script)
// //             }
// //         }
// //     }


// //      static stringToFragment(string){
// //         const template = document.createElement('template')
// //         template.innerHTML = string
// //         if(string.includes('<script')) OctopusEngine.fixScripts(template.content)
// //         //return template.content
// //         return template
// //     }

// //     static fixScripts(fragment){
// //         for(const element of fragment.querySelectorAll('template, script')){
// //             if(element instanceof HTMLTemplateElement) OctopusEngine.fixScripts(element.content)
// //             else{
// //                 const workingScript = document.createElement('script')
// //                 Array.from(element.attributes).forEach(attr => workingScript.setAttribute(attr.name, attr.value))
// //                 workingScript.type = 'module'
// //                 workingScript.textContent = element.textContent
// //                 element.replaceWith(workingScript)
// //             }
// //         }
// //     }



// //     static stringToTemplate(string){
// //         let template = document.createElement('template')
// //         template.innerHTML = string
// //         OctopusTemplates.fixScripts(template)
// //         return template
// //     }

// //     static fixScripts(template){
// //         const content = template.content

// //         for(const innerTemplate of content.querySelectorAll('template')) OctopusTemplates.fixScripts(innerTemplate)

// //         for(const script of content.querySelectorAll('script')){
// //             const workingScript = document.createElement('script')
// //             Array.from(script.attributes).forEach(attr => workingScript.setAttribute(attr.name, attr.value))
// //             workingScript.type = 'module'
// //             workingScript.textContent = script.textContent
// //             script.replaceWith(workingScript)
// //         }
// //     }


// //        static stringToTemplate(string){
// //         let template = document.createElement('template')
// //         template.innerHTML = string
// //         if(string.indexOf('<script') > -1) OctopusTemplates.fixScripts(template)
// //         return template
// //     }

// //     static fixScripts(template){
// //         for(const child of template.content.children){
// //             for(const innerTemplate of child.querySelectorAll('template')) OctopusTemplates.fixScripts(innerTemplate)

// //             for(const script of child.querySelectorAll('script')){
// //                 const workingScript = document.createElement('script')
// //                 workingScript.type = 'module'
// //                 workingScript.textContent = script.textContent
// //                 child.replaceChild(workingScript, script)
// //             }
// //         }
// //     }



    // static stringToTemplate(string:any){
    //     let template = document.createElement('template')
    //     template.innerHTML = string
    //     OctopusTemplates.fixScripts(template)
    //     return template
    // }

    // static fixScripts(template:any){
    //     const content = template.content

    //     for(const innerTemplate of content.querySelectorAll('template')) OctopusTemplates.fixScripts(innerTemplate)

    //     for(const script of content.querySelectorAll('script')){
    //         const workingScript = document.createElement('script')
    //         Array.from(script.attributes).forEach((attr:any) => workingScript.setAttribute(attr.name, attr.value))
    //         workingScript.type = 'module'
    //         workingScript.textContent = script.textContent
    //         script.replaceWith(workingScript)
    //     }
    // }