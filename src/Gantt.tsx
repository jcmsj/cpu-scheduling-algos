import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
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

/*
* task.id is not used internally for react as the task may appear multiple times which would conflict with react's key-based diffing system.
*/
export function GanttChart({ result }: { result: Partial<Result<Task>> }) {
    let burstTimeSum = 0;
    const colors = useRef({} as {[key:string]:string});
    
    useEffect(() => {
        colors.current = {};
    }, [result])

    /**
     * @see Task.ts
     * The same pid should have the same color
     */
    function assignColorUnlessDup(task:Readonly<Task>) {
        if(colors.current[task.id]) {
            return colors.current[task.id]
        }

        return colors.current[task.id] = assignColor(burstTimeSum, task.burstTime * 17)
    }
    return <>
        <Typography variant="h3" style={{ textAlign: "center" }}>Gantt Chart</Typography>
        <div style={{
            display: "flex",
            textAlign: "center",
            padding: "2vh 2vw"
        }}>
            {result.history == undefined ?
                <>
                    <Typography variant="h5">No data to display</Typography>
                </> :
                <>
                    {/* Make the gantt's zero start a bit before the first cell  */}
                    < Cell burstTime={0}>
                        <span style={{ height: "100%" }}>&nbsp;</span>
                        <DanglingBurstTime time={0} style={{ left: "-0.3em" }} />
                    </Cell>
                    {result.history.map((task, i) =>
                        <Cell key={i}
                            burstTime={task.burstTime}
                        >
                            <ProcessInfo
                                task={task}
                                style={{
                                    backgroundColor: assignColorUnlessDup(task)
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