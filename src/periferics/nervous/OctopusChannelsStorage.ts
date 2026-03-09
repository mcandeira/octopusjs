import { OctopusChannel } from './OctopusChannel.ts'

export class OctopusChannelsStorage {

    channels: Map<string, OctopusChannel>

    constructor()
    {
        this.channels = new Map()
    }

    sendData(
        prefix: string, name: string,
        data: any = undefined,
        password: string|undefined = undefined,
        accessible: boolean = true
    ): boolean
    {
        const channelName = `${prefix}::${name}`

        let channel = this.channels.get(channelName)

        if(!channel){
            channel = new OctopusChannel(password, accessible)
            this.channels.set(channelName, channel)
        }

        return channel.sendData(data, password)
    }

    receiveData(
        prefix: string, name: string,
        callback: Function,
        immediate: boolean|undefined = undefined,
        once: boolean = false,
        password: string|undefined = undefined,
    ): boolean
    {
        const channelName = `${prefix}::${name}`

        let channel = this.channels.get(channelName)

        if(!channel){
            channel = new OctopusChannel(password)
            this.channels.set(channelName, channel)
        }

        return channel.receiveData(callback, immediate, once, password)
    }

}