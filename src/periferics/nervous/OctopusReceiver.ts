export class OctopusReceiver {

    private callback: Function

    remember: boolean

    constructor(callback: Function, remember: boolean = false){
        this.callback = callback
        this.remember = remember
    }

    exe(data: any = undefined): void
    {
        this.callback(data)
    }

}