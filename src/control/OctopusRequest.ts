import { OctopusAutoProcess } from './OctopusAutoProcess'
import { OctopusUtils } from './OctopusUtils'

export class OctopusRequest {

    private url: string
    private data: FormData|undefined
    
    constructor(url: string, data: FormData|undefined = undefined)
    {
        this.url = url
        this.data = data
    }

    get(callback: Function, callbackError: Function = callback): void
    {
        const queryString = this.data ? new URLSearchParams(this.data as any).toString() : ''
        const separator = this.url.includes('?') ? '&' : '?'
        const finalUrl = queryString ? `${this.url}${separator}${queryString}` : this.url

        this.fetch(new Request(finalUrl), callback, callbackError)
    }

    post(callback: Function, callbackError: Function = callback): void
    {
        this.fetch(new Request(this.url, {method: 'POST', body: this.data}), callback, callbackError)
    }

    autoprocess(): void
    {
        this.post((data: any) => {new OctopusAutoProcess(data)})
    }

    private fetch(request: Request, callback: Function, callbackError: Function): void
    {
        fetch(request)
        .then((response) => {
            if(!response.ok){throw {error: OctopusUtils.constant.requestError(`${response.status} ${response.statusText}`)}}

            const contentType = response.headers.get('Content-Type')
            if (contentType && contentType.includes('application/json')) return response.json()
            return response.text()
        })
        .then((data) => {callback(data)})
        .catch((error) => {callbackError(error)})
    }

}