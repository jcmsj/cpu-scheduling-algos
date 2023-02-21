export interface Task {
    id: string;
    burstTime: number;
    waitingTime: number;
    turnAroundTime: number;
}

export interface TaskWithArrival extends Task {
    arrivalTime:number;
}

export interface TaskWithPriority extends Task {
    priority:number;
}

export interface TurnAroundAndWaitingTime {
    waitingTime:number;
    turnAroundTime:number;
    burstTime:number;
}
export interface Result<T extends Task> {
    tasks:T[];
    average:TurnAroundAndWaitingTime;
    total:TurnAroundAndWaitingTime;
}