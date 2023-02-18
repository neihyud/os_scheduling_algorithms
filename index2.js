const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const btnCalculate = $('#calculate')
const btnClear = $('#clear')

const tbody = $('tbody')

// JavaScript program for implementation of FCFS
// scheduling with different arrival time

// Function to find the waiting time for all
// processes
function findWaitingTime(processes, burstTime, waitingTime, arrivalTime) {
    const n = burstTime.length

    console.log("waitingTime: ", waitingTime);
    console.log("arrivalTime: ", arrivalTime);
    console.log("burstTime: ", burstTime);
    
    
    if (!arrivalTime) {
        arrivalTime = Array.from({ length: n }, (_, i) => 0)
    }

    var start_time = Array.from({ length: n }, (_, i) => 0)
    start_time[0] = +arrivalTime[0]
    waitingTime[0] = 0

    console.log("start_time: ", start_time);
    
    // calculating waiting time
    for (var i = 1; i < n; i++) {
        //representing wasted time in queue
        var wasted = 0
        // Add burst time of previous processes
        start_time[i] = +start_time[i - 1] + burstTime[i - 1]

        // Find waiting time for current process =
        // sum - arrivalTime[i]
        waitingTime[i] = +start_time[i] - arrivalTime[i]

        console.log(`waitingTime ${i}: `, waitingTime[i])
        console.table(waitingTime[i], start_time[i], arrivalTime[i]);
        
        // If waiting time for a process is in negative
        // that means it is already in the ready queue
        // before CPU becomes idle so its waiting time is 0
        // wasted time is basically time for process to
        // wait after a process is over
        if (waitingTime[i] < 0) {
            wasted = Math.abs(waitingTime[i])
            waitingTime[i] = 0
        }
        // Add wasted time
        start_time[i] = +start_time[i] + wasted
    }
}

// Function to calculate turn around time
function findTurnAroundTime(processes, burstTime, waitingTime, turnaroundTime) {
    const n = burstTime.length
    // Calculating turnaround time by adding burstTime[i] + waitingTime[i]
    for (var i = 0; i < n; i++)
        turnaroundTime[i] = +burstTime[i] + waitingTime[i]
}

// Function to calculate average waiting and turn-around
// times.
function findAvgTime(processes, burstTime, arrivalTime) {
    const n = burstTime.length

    console.log("findAvgTime_arrivalTime: ", arrivalTime)

    if (!arrivalTime) {
        arrivalTime = Array.from({ length: n }, (_, i) => 0)
    }

    if (!processes) {
        processes = Array.from({ length: n }, (_, i) => i + 1)
    }

    console.log('process: ', processes)

    let waitingTime = Array.from({ length: n }, (_, i) => 0.0)
    let turnaroundTime = Array.from({ length: n }, (_, i) => 0.0)

    // Function to find waiting time of all processes
    findWaitingTime(processes, burstTime, waitingTime, arrivalTime)

    // Function to find turn around time for all processes
    findTurnAroundTime(processes, burstTime, waitingTime, turnaroundTime)

    let total_waitingTime = 0,
        total_tat = 0
    for (let i = 0; i < n; i++) {
        total_waitingTime = +total_waitingTime + waitingTime[i]
        total_tat = total_tat + turnaroundTime[i]
        var compl_time = +turnaroundTime[i] + arrivalTime[i]

        const html = `
                <td>${processes[i]}</td>
                <td>${burstTime[i]}</td>
                <td>${arrivalTime[i]}</td>
                <td>${waitingTime[i]}</td>
                <td>${turnaroundTime[i]}</td>
                <td>${compl_time}</td>
        `

        const tr = document.createElement('tr')
        tr.innerHTML = html

        tbody.appendChild(tr)
    }

    $(
        '#total-waiting-time'
    ).innerHTML = `<b>Total waiting time</b> = ${total_waitingTime}`

    $('#average-waiting-time').innerHTML = `<b>Average waiting time</b> = ${
        total_waitingTime / n
    }`

    $(
        '#total-turn-around-time'
    ).innerHTML = `<b>Total turn around time</b> = ${total_tat}`

    $(
        '#average-turn-around-time'
    ).innerHTML = `<b>Average turn around time</b> = ${total_tat / n}`
}

btnClear.onclick = (e) => {
    e.preventDefault()
    const inputs = $$('input')
    inputs.forEach((input) => {
        input.value = ''
    })

    tbody.innerHTML = ''
    $$('p').innerHTML = ''
}

btnCalculate.onclick = (e) => {
    e.preventDefault()
    tbody.innerHTML = ''

    let processes = $('#process').value.trim()
    let burst_time = $('#burst-time').value.trim()
    let arrival_time = $('#arrival-time').value.trim()

    if (processes) {
        processes = processes.split(' ').map(Number)
    }

    if (burst_time) {
        burst_time = burst_time.split(' ').map(Number)
    }

    if (arrival_time) {
        arrival_time = arrival_time.split(' ').map(Number)
    }

    findAvgTime(processes, burst_time, arrival_time)
}


$$('#nav li').forEach(li => {
    li.onclick = () => {
        $('#nav li.active').classList.remove("active")
        li.classList.add('active')
    }
})

// Driver code

// Process id's
// var processes = ['P2', 'P1', 'P3']
// var n = processes.length

// // Burst time of all processes
// var burst_time = [5, 9, 6]

// // Arrival time of all processes
// var arrival_time = [0, 3, 6]

// findAvgTime(processes, burst_time, arrival_time)
