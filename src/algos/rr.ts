import { sortByArrival } from "../lib/sortByArrival";
import { Task, Result } from "../Task";
import { calcTotalBurstTime, } from "./fcfs";
import { calcTotalWaiting, initRemaining, StartedTask } from "./srtf";
export function calcTotalTurnAroundTime(tasks: Task[]) {
    return tasks.reduce((sum, task) => sum + task.turnAroundTime, 0);
}

/**
 * Based on https://www.geeksforgeeks.org/program-for-round-robin-scheduling-for-the-same-arrival-time
 */
export function rr(tasks: Task[], quantum: number): Result<Task> {
    quantum = Math.max(1, quantum); // Prevent quantum less than 1
    sortByArrival(tasks);
    const clones = initRemaining(tasks);
    // Starting time would be the 1st task's arrival time
    let time = clones[0].arrivalTime ?? 0;
    clones[0]!.finishTime += quantum;
    let todos = clones.length;
    const history: Task[] = []

    function snapShot(task: StartedTask) {
        history.push({
            ...task,
            burstTime: task.remainingTime
        })
    }
    while (todos > 0) {
        for (const task of clones) {
            if (task.remainingTime > quantum) {
                time += quantum
                task.remainingTime -= quantum;
                history.push({ ...task, burstTime: quantum })
            } else if (task.remainingTime > 0) {
                // Last cycle for this process
                time += task.remainingTime
                task.finishTime = time
                task.waitingTime = time - task.burstTime - task.arrivalTime;
                task.turnAroundTime = task.waitingTime + task.burstTime;

                //For gantt chart, not really part of algo
                snapShot(task);

                task.remainingTime = 0;  // Process done
                todos--;
            }
        };
    }

    const totalWaitingTime = calcTotalWaiting(clones);
    const totalTurnAroundTime = calcTotalTurnAroundTime(clones);
    const totalBurstTime = calcTotalBurstTime(clones);
    return {
        tasks: clones,
        history,
        total: {
            turnAroundTime: totalTurnAroundTime,
            waitingTime: totalWaitingTime,
            burstTime: totalBurstTime
        },
        average: {
            turnAroundTime: totalTurnAroundTime / tasks.length,
            waitingTime: totalWaitingTime / tasks.length,
            burstTime: totalBurstTime / tasks.length
        },
    };
}