import { Task } from "../Task";
import { sortByArrival } from "./sortByArrival";

/**
 * Helper function for all algorithms to sort the tasks by their priority and arrival times.
 */
export function sortByPriorityAndArrival(tasks: Task[]) {
    tasks = sortByArrival(tasks); //The first task to arrived should be completed.
    const first = tasks.shift();
    if (first) {
        const allSameArrival = tasks.every(task => task.arrivalTime == first.arrivalTime);
        //If every task has the same arrival time then just sort it by priority.
        if (allSameArrival) {
            tasks.unshift(first);
            tasks.sort((a, b) => a.priority - b.priority);
        } else {
            //Otherwise, sort the priorities of those that have arrived already
            tasks.sort((a, b) => {
                if (a.arrivalTime <= b.arrivalTime) {
                    return a.priority - b.priority;
                }

                return a.arrivalTime - b.arrivalTime;
            })
            tasks.unshift(first);
        }
    }
    return tasks;
}