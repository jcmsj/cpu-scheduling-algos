import { Typography } from "@mui/material";
import { Result, Task } from "./Task";

export function DanglingBurstTime({ time, style, ...props }: { time: number, style?: React.CSSProperties }) {
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

export function ProcessInfo({ task, style }: { task: Task, style: React.CSSProperties }) {
    return <span style={{
        border: "0.2em solid black",
        padding: "1vh 1vw",
        ...style
    }}
    >
        P<sub>{task.id}</sub>
        ({task.burstTime})
    </span>;
}
export function Cell({ burstTime, style, children }: { burstTime: number, style?: React.CSSProperties } & React.PropsWithChildren) {
    return <div className="cell"
        style={{
            display: "flex",
            flexDirection: "column",
            //Cell width scales with burst time
            width: `${burstTime * 100}%`,
            ...style
        }}
    >
        {children}
    </div>;
}

/**
 * Assigns a color based on the accumulated burst time but since this may be small, use an arbitrary modifier n.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl
 */
function assignColor(accumulatedBurstTime: number, modifier: number) {
    return `hsl(${accumulatedBurstTime * modifier}, 100%, 60%)`;
}

export function GanttChart({ result }: { result: Partial<Result<Task>> }) {
    let burstTimeSum = 0;

    return <>
        <Typography variant="h3" style={{ textAlign: "center" }}>Gantt Chart</Typography>
        <div style={{
            display: "flex",
            textAlign: "center",
            padding: "2vh 2vw"
        }}>
            {result.tasks == undefined ?
                <>
                    <Typography variant="h5">No data to display</Typography>
                </> :
                <>
                    {/* Make the gantt's zero start a bit before the first cell  */}
                    < Cell burstTime={0}>
                        <span style={{ height: "100%" }}>&nbsp;</span>
                        <DanglingBurstTime time={0} style={{ left: "-0.3em" }} />
                    </Cell>
                    {result.tasks.map(task =>
                        <Cell key={task.id}
                            burstTime={task.burstTime}
                        >
                            <ProcessInfo
                                task={task}
                                style={{
                                    backgroundColor: assignColor(burstTimeSum, task.burstTime * 17)
                                }}
                            />
                            <DanglingBurstTime
                                time={burstTimeSum += task.burstTime}
                                style={{
                                    right: "-0.25em",
                                }}
                            />
                        </Cell>
                    )}
                </>
            }
        </div>
    </>
}