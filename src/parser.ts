import { Task } from "./Task";

export function stringToNumbers(s: string, limit?: number) {
    return s.trim().split(" ", limit).map(n => parseInt(n));
}
export function parseTasks(
    rawBursts: string,
    rawArrivals: string,
    rawPriorities?: string,
): Task[] {
    //Convert the string data into int array
    const bursts = stringToNumbers(rawBursts);
    const prios = typeof rawPriorities == "string" ? 
        stringToNumbers(rawPriorities) 
        : new Array(bursts.length).fill(0);
    return stringToNumbers(rawArrivals, bursts.length)
        .map((arrivalTime, i) => {
            return {
                id: i,
                burstTime: bursts[i],
                waitingTime: 0,
                turnAroundTime: 0,
                arrivalTime,
                finishTime: 0,
                priority: prios[i],
            }
        });
}

/**
 * For algorithms that include priorities, call this function after using parseTasks()
 */
export function addPrio(tasks: Task[], rawPriorities: string) {
    const prios = stringToNumbers(rawPriorities, tasks.length);
    tasks.map((task, i) => {
        task.priority = prios[i]
    })
    return tasks;
}