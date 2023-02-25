import { sortByArrival } from "../lib/sortByArrival";
import { Result, Task } from "../Task";
import { calcTotalBurstTime, calcTurnAroundTime } from "./fcfs";

export interface StartedTask extends Task {
    remainingTime: number;
}

export function findWaitingTime(tasks: Task[]) {
    const clone: StartedTask[] = tasks.map(task => ({ ...task, remainingTime: task.burstTime }));
    let complete = 0;
    let time = 0;
    let check = false;
    let minBT = Number.MAX_SAFE_INTEGER;
    let active:StartedTask = undefined!;
    while (complete < tasks.length) {
        for (let i = 0; i < clone.length; i++) {
            const task = clone[i];
            if (task.arrivalTime <= time && (task.remainingTime < minBT && task.remainingTime > 0)) {
                minBT = task.remainingTime;
                active = task;
                check = true;
            }
        }

        if (check === false || active === undefined) {
            time++;
            continue;
        }
        // Reduce remaining time by one
        active.remainingTime--;

        //Update minimum
        minBT = active.remainingTime;
        if (minBT <= 0) {
            minBT = Number.MAX_SAFE_INTEGER;
        }

        // When process completes
        if (active.remainingTime == 0) {
            //Increment complete
            complete++
            check = false;

            //Find finish time and waiting time of current process
            active.finishTime = time + 1;
            active.waitingTime = Math.max(
                active.finishTime - 
                active.arrivalTime - 
                active.burstTime, 
            0);
        }

        time++;
    }

    return clone;
}

export function srtf(tasks: Task[]): Result<Task> {
    sortByArrival(tasks);
    tasks = findWaitingTime(tasks);
    const totalTurnAroundTime = calcTurnAroundTime(tasks);
    const burstTime = calcTotalBurstTime(tasks);
    const totalWaitingTime = tasks.reduce((sum, task) => sum += task.waitingTime, 0);
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