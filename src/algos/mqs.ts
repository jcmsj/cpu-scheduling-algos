import { Result, Task } from "../Task";
import { sortByArrival } from "../lib/sortByArrival";
import { sortByBurst } from "../lib/sortByBurst";
import { calcTurnAroundTime, calcWaitingTime, fcfs } from "./fcfs";
import { srtf } from "./srtf";

export function calcTotalBurstTime(tasks: Task[]) {
    return tasks.reduce((sum, task) => sum + task.burstTime, 0);
}

export function calcFinishTime(tasks: Task[]): number {
    let finishTime = tasks[0]?.arrivalTime ?? 0;
    tasks.forEach((task) => {
        task.finishTime = finishTime += task.burstTime;
    });
    return finishTime;
}

/**
 * Algorithm:
 * 1. Sort by arrival time.
 * 2. Divide tasks into two arrays based on priority level.
 * 3. Sort the high priority tasks by burst time for SRTF.
 * 4. Perform SRTF on high priority tasks.
 * 5. Perform FCFS on low priority tasks.
 * 6. Combine results and calculate average and total values.
 */

export function mqs(tasks: Task[]): Result<Task> {
    sortByArrival(tasks);
    const highPriorityTasks = tasks.filter(task => task.priority <= 1);
    const lowPriorityTasks = tasks.filter(task => task.priority > 1);
    sortByBurst(highPriorityTasks);

    const highPriorityResult = srtf(highPriorityTasks);
    const lowPriorityResult = fcfs(lowPriorityTasks);

    const combinedTasks = [...highPriorityResult.tasks, ...lowPriorityResult.tasks];
    const totalWaitingTime = calcWaitingTime(combinedTasks);
    const totalTurnAroundTime = calcTurnAroundTime(combinedTasks);

    return {
        tasks: combinedTasks,
        history: combinedTasks,
        total: {
            turnAroundTime: totalTurnAroundTime,
            waitingTime: totalWaitingTime,
            burstTime: calcTotalBurstTime(combinedTasks)
        },
        average: {
            turnAroundTime: totalTurnAroundTime / combinedTasks.length,
            waitingTime: totalWaitingTime / combinedTasks.length,
            burstTime: calcTotalBurstTime(combinedTasks) / combinedTasks.length
        },
    };
}

