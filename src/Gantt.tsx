import { Result, Task } from "./Task";

export function TableHead({ len }: { len: number }) {
    return <thead>
        <tr>
            <th colSpan={len + 1}>Gantt Chart</th>
        </tr>
        <tr>
            {new Array(len + 1).fill(0).map((_, i) =>
                <th key={i}>&nbsp;</th>
            )}
        </tr>
    </thead>
}
export function Gantt({ result }: { result: Result<Task> }) {
    console.table(result)
    let burstTimeSum = 0;
    return <>
        <table style={{ width: "100%", tableLayout:"fixed" }}>
            <TableHead len={result.total.burstTime} />
            <tbody>
                <tr>
                    <td></td>{/* for alignment as an extra column is added by TableHead */}
                    {result.tasks.map(task =>
                        <td
                            key={task.id}
                            colSpan={task.burstTime}
                            style={{
                                textAlign: "center",
                                border: "2px solid black", borderRadius: "5px",
                            }}>
                            P<sub>{task.id}</sub><wbr />
                            ({task.burstTime})
                        </td>
                    )}
                </tr>
                <tr>
                    <td style={{ textAlign: "end" }}>
                        0
                    </td>
                    {result.tasks.map(task =>
                        <td
                            key={task.id}
                            colSpan={task.burstTime}
                            style={{ textAlign: "end" }}
                        >
                            {burstTimeSum += task.burstTime}</td>
                    )}
                </tr>
            </tbody>
        </table>
    </>
}