import { Result, Task } from "../Task";

/**
 * Updates each task with the correct waiting time and returns the total.
 */
export function calcWaitingTime(tasks: Task[]) {
    tasks[0].waitingTime = 0;

    let sum = 0;
    tasks.reduce((previous, task) => {
        sum += task.waitingTime = previous.burstTime + previous.waitingTime
        return task;
    })
    return sum;
}

export function calcTotalBurstTime(tasks:Task[]) {
    return tasks.reduce((sum, task) => sum + task.burstTime, 0);
}
/**
 * Updates each task with the correct turn around time and returns the total.
 */
export function calcTurnAroundTime(tasks: Task[]) {
    return tasks.reduce((sum, task) => {
        return sum + (task.turnAroundTime = task.burstTime + task.waitingTime);
    }, 0) / tasks.length;
}

export function fcfs(tasks: Task[]):Result<Task> {
    const totalWaitingTime = calcWaitingTime(tasks);
    const totalTurnAroundTime = 
    calcTurnAroundTime(tasks);
    const burstTime = calcTotalBurstTime(tasks);

    return {
        tasks,
        total: {
            turnAroundTime:totalTurnAroundTime,
            waitingTime:totalWaitingTime,
            burstTime
        },
        average: {
            turnAroundTime:totalTurnAroundTime/tasks.length,
            waitingTime: totalWaitingTime /tasks.length,
            burstTime: burstTime / tasks.length
        },
    };
}