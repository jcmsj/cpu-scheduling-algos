import { Task } from "../Task";

/**
 * Updates each task with the correct waiting time and returns its average.
 */
export function calcWaitingTime(tasks: Task[]) {
    tasks[0].waitingTime = 0;

    let sum = 0;
    tasks.reduce((previous, task) => {
        sum += task.waitingTime = previous.burstTime + previous.waitingTime
        
        return task;
    })
    return sum/tasks.length;
}

export function calcAVGTurnAroundTime(tasks: Task[]) {
    return tasks.reduce((result, task) => {
        return result + task.turnAroundTime
    }, 0) / tasks.length;
}

/**
 * Updates each task with the correct turn around time and returns its average.
 */
export function calcTurnAroundTime(tasks: Task[]) {
    let sum = 0
    tasks.forEach(task => {
        sum += task.turnAroundTime = task.burstTime + task.waitingTime
    });
    return sum/tasks.length;
}

export function fcfs(tasks: Task[]) {
    const avgWaitingTime = calcWaitingTime(tasks);
    const avgTurnAroundTime = 
    calcTurnAroundTime(tasks);
    return {avgTurnAroundTime, avgWaitingTime, tasks}
}