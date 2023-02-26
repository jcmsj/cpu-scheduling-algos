import { Task } from "./Task";

export function stringToNumbers(s: string, limit?: number) {
    return s.trim().split(" ", limit).map(n => parseInt(n));
}

export function emptyOrToNumbers(s: string, size?: number, filler: number = 0) {
    return s.length == 0 ? [] : stringToNumbers(s, size);
}

/**
 * Parses user input into arrays of the relevant data
 * If the raw arrival times or priorities are empty strings, these would be filled with array of zeroes with the burst time's size.
 */
export function parseTasks(
    rawBursts: string,
    rawArrivals: string,
    rawPriorities: string,
): Task[] {
    //Convert the string data into int array
    [rawArrivals, rawBursts, rawPriorities].map(s =>  s.trim()).filter(s => s.length == 0);
    const bursts = emptyOrToNumbers(rawBursts);
    const prios = emptyOrToNumbers(rawPriorities, bursts.length);
    const arrivals = emptyOrToNumbers(rawArrivals, bursts.length);
    return arrivals
        .map((arrivalTime, i) => ({
            id: i,
            burstTime: bursts[i],
            waitingTime: 0,
            turnAroundTime: 0,
            arrivalTime,
            finishTime: 0,
            priority: prios[i],
        }));
}