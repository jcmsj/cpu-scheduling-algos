export interface Task {
    id: string;
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
export interface Result<T> {
    average:CalculatedFields;
    total:CalculatedFields;
    tasks:T[];
}