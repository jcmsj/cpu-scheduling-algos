import { sortByArrival } from "../lib/sortByArrival";
import { Result, Task } from "../Task";
import { calcTotalBurstTime, calcTurnAroundTime } from "./fcfs";

export interface StartedTask extends Task {
    remainingTime: number;
}

export function whenDone(task: Task, time: number) {
    //Find finish time and waiting time of the task
    task.finishTime = time + 1;
    task.waitingTime = Math.max(
        task.finishTime -
        task.arrivalTime -
        task.burstTime,
        0);
}

/**
 * Creates a clone of the tasks with a new field - remaining time
 */
export function initRemaining(tasks:Task[]):StartedTask[] {
    return tasks.map(task => ({ ...task, remainingTime: task.burstTime }));
}
/**
 * Based on https://www.geeksforgeeks.org/shortest-remaining-time-first-preemptive-sjf-scheduling-algorithm
 */
export function simulate(tasks: Task[]) {
    const clones = initRemaining(tasks);
    let complete = 0;
    const history: StartedTask[] = []
    let time = 0;
    let check = false;
    let minRemaining = Number.MAX_SAFE_INTEGER;
    let active: StartedTask = undefined!;
    let activeTime = 0; //For snapshots

    function snapShot(task: StartedTask) {
        //Record only if the active would change
        if (active && active.id !== task.id) {
            const snapshot = {
                ...active,
                burstTime: activeTime
            };
            if (snapshot.burstTime > 0) {
                history.push(snapshot)
            }
            activeTime = 0;
        }
    }
    while (complete < tasks.length) {
        for (const task of clones) {
            if (task.arrivalTime <= time &&
                (task.remainingTime < minRemaining && task.remainingTime > 0)) {
                minRemaining = task.remainingTime;
                //Record the process change which would be displayed in Gantt.
                snapShot(task);
                active = task;
                check = true;
            }
        }

        if (check === false) {
            time++;
            activeTime++;
            continue;
        }
        // Reduce remaining time by one
        active.remainingTime--;
        activeTime++;

        //Update minimum
        minRemaining = active.remainingTime;
        if (minRemaining <= 0) {
            minRemaining = Number.MAX_SAFE_INTEGER;
        }

        // When process completes
        if (active.remainingTime == 0) {
            //Increment complete
            complete++
            check = false;
            whenDone(active, time)
        }

        time++;
    }

    //Must record the last active task
    history.push(active);
    return { clone: clones, history };
}

export function calcTotalWaiting(tasks:Task[]) {
    return tasks.reduce((sum, task) => sum += task.waitingTime, 0);
}
export function srtf(tasks: Task[]): Result<Task> {
    sortByArrival(tasks);
    const { clone, history } = simulate(tasks);
    tasks = clone;
    const totalTurnAroundTime = calcTurnAroundTime(tasks);
    const burstTime = calcTotalBurstTime(tasks);
    const totalWaitingTime = calcTotalWaiting(tasks);
    return {
        tasks,
        //Set history to the same tasks as there's no dupes here.
        history,
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