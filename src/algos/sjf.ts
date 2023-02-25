import { Result, Task } from "../Task";
import { calcFinishTime, calcTotalBurstTime, calcTurnAroundTime, calcWaitingTime } from "./fcfs";

export function priorityBurstTime(tasks: Task[]) {
    for(let i = 1; i< tasks.length; i++){
        const temp = tasks[i].burstTime;
        let j = i - 1;

        while(j >= 0 && tasks[j].burstTime > temp){
                tasks[j + 1].burstTime = tasks[j].burstTime; 
                j--;
         }
        tasks[j + 1].burstTime = temp;
    }
}

/**
 * 
 */
export function sjf(tasks: Task[]): Result<Task> {
    priorityBurstTime(tasks);
    const totalWaitingTime = calcWaitingTime(tasks);
    const totalTurnAroundTime = calcTurnAroundTime(tasks);
    const burstTime = calcTotalBurstTime(tasks);
    calcFinishTime(tasks);
    return {
        tasks,
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