export interface Task {
    id: number;
    burstTime: number;
    waitingTime: number;
    turnAroundTime: number;
    arrivalTime:number;
    finishTime:number;
    priority:number;
}

export interface CalculatedFields {
    waitingTime:number;
    turnAroundTime:number;
    burstTime:number;
}

/**
 * Since the algorithm's progress is shown by the Gantt chart and tasks appear multiple times, push a snapshot of the clone at that point in the history field when needed. For algos that assure a task is executed only once, simply pass the same variable to history (@see (fcfs.ts) for an example.
 */
export interface Result<T> {
    average:CalculatedFields;
    total:CalculatedFields;
    tasks:T[];
    history:T[];
}