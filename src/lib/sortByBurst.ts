import { Task } from "../Task";

export function sortByBurst(tasks: Task[]) {
    tasks.sort((a, b) => a.burstTime - b.burstTime);
  }