import { useState } from "react";
import { fcfs } from "./algos/fcfs";
import { Task } from "./Task";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
export default function FCFSPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [raw_ids, setRawIDS] = useState("");
    const [raw_burst_times, setRawBurstTimes] = useState("");

    function parseTasks(raw_ids: string, raw_burst_times: string) {
        const ids = raw_ids.split(" ");
        const burst_times = raw_burst_times.split(" ", ids.length).map(n => parseInt(n));
        let ts: Task[] = [];
        for (let i = 0; i < ids.length; i++) {
            ts.push({ id: ids[i], burstTime: burst_times[i], waitingTime: 0, turnAroundTime: 0 });
        }
        const { tasks: _tasks, ...avgs } = fcfs(ts);
        setTasks(_tasks);
        console.table(_tasks);
        console.table(avgs);
    }
    return <>
        <div style={{display:"flex", flexDirection:"column"}}>
            <TextField label="Enter process IDs (space separated)" value={raw_ids}
            onChange={e => setRawIDS(e.target.value)} />
            <TextField label="Enter burst time (space separated)"
                onChange={e => setRawBurstTimes(e.target.value)}
            />
        </div>
        <Button 
         variant="contained"
        onClick={_ => 
            parseTasks(raw_ids, raw_burst_times)
        }>Calculate</Button>
    </>
}