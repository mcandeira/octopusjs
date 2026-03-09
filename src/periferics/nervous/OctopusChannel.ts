import { OctopusReceiver } from './OctopusReceiver.ts'

export class OctopusChannel {

    private data: any

    private initializedData: boolean = false

    private receivers: Array<OctopusReceiver> = []

    private password: string|undefined

    private accesible: boolean

    constructor(password: string|undefined = undefined, accesible: boolean = true){
        this.password = password
        this.accesible = accesible
    }

    sendData(data: any = undefined, password: string|undefined = undefined): boolean
    {
        if(this.password !== password) return false

        this.data = data
        this.initializedData = true

        const receivers = this.receivers
        for(const receiver of receivers) receiver.exe(data)

        this.receivers = receivers.filter(receiver => receiver.remember)
        
        return true
    }

    receiveData(callback: Function, immediate: boolean|undefined = undefined, once: boolean = false, password: string|undefined = undefined): boolean
    {
        if(!this.accesible && this.password !== password) return false

        if(immediate === false || !once || !immediate && !this.initializedData) this.receivers.push(new OctopusReceiver(callback, !once))

        if(immediate || immediate === undefined && this.initializedData) callback(this.data)

        return true
    }

}