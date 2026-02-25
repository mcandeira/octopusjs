export class OctopusPerformance {

    private timeStamps: Array<{name: string, stamp: number}> = []

    constructor()
    {
        this.timeStamps.push({name: 'init', stamp: performance.now()})
    }

    stamp(name: string): void
    {
        this.timeStamps.push({name, stamp: performance.now()})
    }

    showResults(): void
    {
        const timeStamps = this.timeStamps
        const length = timeStamps.length

        if(length < 2){console.warn('[Octopus Performance] Not enough stamps to measure.'); return}

        console.log('%c[Octopus Performance Results]', 'color: #00ffcc; font-weight: bold; font-size: 14px;')

        let totalTime = 0
        for(let i = 1; i < length; i++){
            const current = timeStamps[i]
            const previous = timeStamps[i - 1]
            const duration = current.stamp - previous.stamp
            
            totalTime += duration
            
            console.log(
                `⏱️ %c${current.name}%c took %c${duration.toFixed(2)} ms`, 
                'color: #aaa; font-style: italic;', 
                'color: inherit;', 
                'color: #ffaa00; font-weight: bold;'
            )
        }

        console.log('%c----------------------------------------', 'color: #555;')
        console.log(`%c🚀 Total execution time: ${totalTime.toFixed(2)} ms`, 'color: #00ff00; font-weight: bold; font-size: 13px;')
    }

}