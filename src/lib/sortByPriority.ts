import { Task } from "../Task";
import { sortByArrival } from "./sortByArrival";

/**
 * Helper function for all algorithms to sort the tasks by their priority.
 */
export function sortByPriority(tasks: Task[]) {
    //Need to identify the first arriving process.
    return sortByArrival(tasks).sort((a, b) => {
        //First arriving process must be run.
        if (a.arrivalTime == 0) {
            return -1;
        }
        return a.priority - b.priority;
    });
}