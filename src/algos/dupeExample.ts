import { sortByArrival } from "../lib/sortByArrival";
import { Task } from "../Task";
import { calcTotalBurstTime, calcTurnAroundTime, calcWaitingTime } from "./fcfs";

/**
 * This example shows a sample output where processes appear multiple times.
 */
export default function DupeExample(tasks:Task[]) {
    const clone = new Array(tasks.length);
    tasks.forEach(task => {
        clone.push({...task})
        clone.push(task)
    })
    sortByArrival(tasks);
    const tWT = calcWaitingTime(tasks);
    const tTAT = calcTurnAroundTime(tasks);
    const burstTime = calcTotalBurstTime(tasks);

    return {
        tasks,
        history:clone,
        total: {
            turnAroundTime: tTAT,
            waitingTime: tWT,
            burstTime
        },
        average: {
            turnAroundTime: tTAT / tasks.length,
            waitingTime: tWT / tasks.length,
            burstTime: burstTime / tasks.length
        },
    };
}