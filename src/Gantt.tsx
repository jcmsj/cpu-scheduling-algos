import { Result, Task } from "./Task";

export function DanglingBurstTime({ time }: { time: number }) {
    return <span style={{ 
        textAlign: "end", 
        position: "relative", 
        right: "-0.75em", 
        bottom: "-1.5em" 
    }}>
        {time}
    </span>
}
export function Cell({ task, accumulatedBurstTime, ...props }: { task: Task, accumulatedBurstTime: number }) {
    return <>
        <span className="" style={{
            display: "flex",
            flexDirection: "column",
            width: `${task.burstTime * 100}%`,
            border: "0.2em solid black",
        }} {...props} >
            <span>
                P<sub>{task.id}</sub><wbr />
                ({task.burstTime})
            </span>
            <DanglingBurstTime time={accumulatedBurstTime} />
        </span>
    </>
}

export function GanttChart({ result }: { result: Result<Task> }) {
    let burstTimeSum = 0;
    return <>
        <h2 style={{ textAlign: "center" }}>Gantt Chart</h2>
        <div style={{ display: "flex", textAlign: "center", padding: "2vh 2vw" }}>
            {result.tasks.map(task =>
                <Cell task={task} key={task.id} accumulatedBurstTime={burstTimeSum += task.burstTime} />
            )}
        </div>
    </>
}