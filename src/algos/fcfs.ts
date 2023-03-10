import { Result, Task } from "../Task";
import { sortByArrival } from "../lib/sortByArrival";

/**
 * Updates each task with the correct waiting time and returns the total.
 */
export function calcWaitingTime(tasks: Task[]) {
    tasks[0].waitingTime = 0;
    let sum = 0;    
    tasks.reduce((previous, task) => {
        sum += task.waitingTime = previous.burstTime + previous.waitingTime + previous.arrivalTime - task.arrivalTime
        return task;
    })
    return sum;
}

export function calcTotalBurstTime(tasks: Task[]) {
    return tasks.reduce((sum, task) => sum + task.burstTime, 0);
}

/**
 * Updates each task with the correct turn around time and returns the total.
 */
export function calcTurnAroundTime(tasks: Task[]) {
    return tasks.reduce((sum, task) => {
        task.turnAroundTime = task.burstTime + task.waitingTime;
        return sum + task.turnAroundTime;
    }, 0);
}

export function calcFinishTime(tasks: Task[]) {
    return tasks.reduce((sum, task) =>
        task.finishTime = sum += task.burstTime
        , (tasks[0]?.arrivalTime) ?? 0);
}

/**
 * Algorithm:
 * 1. Sort by arrival time.
 * 2. Waiting time is taken by the sum of the previous' task's waiting time, burst time, and arrival time minus the current task's arrival time.
 * 3. Turn around time is solved by adding a task's burst time and waiting time.
 * 4. Finish time is the sum of burst times up until a task and the first task's arrival time taken into account.
 * 5. The average and total values of those parameters are also needed.
 */
export function fcfs(tasks: Task[]): Result<Task> {
    sortByArrival(tasks);
    const totalWaitingTime = calcWaitingTime(tasks);
    const totalTurnAroundTime = calcTurnAroundTime(tasks);
    const burstTime = calcTotalBurstTime(tasks);
    calcFinishTime(tasks);
    return {
        tasks,
         //Set history to the same tasks as there's no dupes here.
        history:tasks,
        total: {
            turnAroundTime: totalTurnAroundTime,
            waitingTime: totalWaitingTime,
            burstTime
        },
        average: {
            turnAroundTime: totalTurnAroundTime / tasks.length,
            waitingTime: totalWaitingTime / tasks.length,
            burstTime: burstTime / tasks.length
        },
    };
}