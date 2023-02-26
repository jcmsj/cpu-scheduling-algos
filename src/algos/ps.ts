import { Result, Task } from "../Task";
import { sortByPriorityAndArrival } from "../lib/sortByPriorityAndArrival";
import { calcFinishTime, calcTotalBurstTime, calcTurnAroundTime, calcWaitingTime} from "./fcfs";

export function ps(tasks: Task[]): Result<Task> {
    tasks = sortByPriorityAndArrival(tasks);
    const totalWaitingTime = calcWaitingTime(tasks);
    const totalTurnAroundTime = calcTurnAroundTime(tasks);
    const burstTime = calcTotalBurstTime(tasks);
    calcFinishTime(tasks);
    return {
        tasks,
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