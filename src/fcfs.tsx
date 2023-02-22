import { useState } from "react";
import { fcfs } from "./algos/fcfs";
import { Result, Task } from "./Task";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { GanttChart } from "./Gantt";
export default function FCFSPage() {
    const [result, setResult] = useState<{} | Result<Task>>({});
    const [raw_burst_times, setRawBurstTimes] = useState("");

    function parseTasks() {

        //Convert the string data into int array
        const tasks: Task[] = raw_burst_times.split(" ").map(n => parseInt(n))
            //Then form the task objects from the array
            .map((burstTime, i) => {
                return {
                    id: "" + i,
                    burstTime,
                    waitingTime: 0,
                    turnAroundTime: 0
                }
            });
        //Finally, calculate the schedule using FCFS algorithm
        setResult(fcfs(tasks));
    }
    return <>
        <div style={{ display: "flex", flexDirection: "column", rowGap: "2vh" }}>
            <TextField
                required
                label="Enter burst time (space separated)"
                onChange={e => setRawBurstTimes(e.target.value)}
            />
        </div>
        <Button
            variant="contained"
            onClick={parseTasks}
        >Calculate
        </Button>
        {Object.hasOwn(result, "tasks") ?
        
            <GanttChart result={result}>

            </GanttChart> : null
        }
    </>
}