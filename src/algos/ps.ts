import { Result, Task } from "../Task";
import { sortByPriority } from "../lib/sortByPriority";
import { calcFinishTime, calcTotalBurstTime, calcTurnAroundTime, calcWaitingTime } from "./fcfs";

export function ps(tasks: Task[]): Result<Task> {
    sortByPriority(tasks);
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