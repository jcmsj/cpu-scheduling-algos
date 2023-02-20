export interface Task {
    id: string;
    priority?: number;
    burstTime: number;
    waitingTime: number;
    turnAroundTime: number;
}
