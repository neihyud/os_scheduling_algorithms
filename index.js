
// 
const FCFSAverage = (...params) => {
    const len = params.length

    let total = 0
    let totalWaitTime = 0
    let timeWait = []
    params.forEach(param => {
        totalWaitTime += total
        timeWait.push(total)
        total += param
    })

    return [timeWait, totalWaitTime, len, Math.round(totalWaitTime / len * 100) / 100]
}

console.log(FCFSAverage(24, 3, 6));

// const FCFSAverageWithBurstTime = ([...burstTime], [...arrivalTime]) {

// }
