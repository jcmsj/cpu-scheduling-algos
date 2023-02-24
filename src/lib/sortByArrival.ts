import { Task } from "../Task";

/**
 * Helper function for all algorithms to sort the tasks by their arrival time.
 */
export function sortByArrival(tasks: Task[]) {
    return tasks.sort((a, b) => a.arrivalTime - b.arrivalTime);
}