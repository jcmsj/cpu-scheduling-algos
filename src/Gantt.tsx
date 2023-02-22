import { Result, Task } from "./Task";

export function DanglingBurstTime({ time, style,...props }: { time: number, style?:React.CSSProperties }) {
    return <span style={{
        textAlign: "end",
        position: "relative",
        ...style
    }}
        {...props}
    >
        {time}
    </span >
}

export function ProcessInfo({ task }: { task: Task }) {
    return <span style={{
        border: "0.2em solid black",
    }} >
        <span>
            P<sub>{task.id}</sub>
            ({task.burstTime})
        </span>
    </span>
}
export function Cell({ burstTime, children }: { burstTime: number } & React.PropsWithChildren) {
    return <>
        <div className="cell"
            style={{
                display: "flex",
                flexDirection: "column",
                //Cell width scales with burst time
                width: `${burstTime * 100}%`,
            }}>
            {children}
        </div>
    </>
}

export function GanttChart({ result }: { result: Result<Task> }) {
    let burstTimeSum = 0;
    return <>
        <h2 style={{ textAlign: "center" }}>Gantt Chart</h2>
        <div style={{ display: "flex", textAlign: "center", padding: "2vh 2vw" }}>
            <Cell burstTime={0}>
                <span style={{ height: "100%" }}>&nbsp;</span>
                <DanglingBurstTime time={0} style={{left:"-0.3em"}}/>
            </Cell>
            {result.tasks.map(task =>
                <Cell key={task.id} burstTime={task.burstTime}>
                    <ProcessInfo task={task} />
                    <DanglingBurstTime
                        time={burstTimeSum += task.burstTime}
                        style={{
                            right: "-0.25em",
                        }}
                    />
                </Cell>
            )}
        </div>
    </>
}