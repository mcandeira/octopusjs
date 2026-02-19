import { OctopusAutoProcess } from './OctopusAutoProcess'

export class OctopusRequest {

    url: any
    data: any
    
    constructor(url: any, data: any = null){this.url = url; this.data = data}

    get(callback: any, callbackError = callback){this.#fetch(new Request(`${this.url}${this.data ? '?' + new URLSearchParams(this.data) : ''}`), callback, callbackError)}

    post(callback: any, callbackError = callback){this.#fetch(new Request(this.url, {method: 'POST', body: this.data}), callback, callbackError)}

    autoprocess(){this.post((data: any) => {new OctopusAutoProcess(data)})}

    #fetch(request: any, callback: any, callbackError: any){
        fetch(request)
        .then((response) => {
            if(!response.ok){throw {error: `[Octopus] Request Error: ${response.status} ${response.statusText}.`}}

            const contentType = response.headers.get('Content-Type')
            if (contentType && contentType.includes('application/json')) return response.json()
            return response.text()
        })
        .then((data) => {callback(data)})
        .catch((error) => {callbackError(error)})
    }

}