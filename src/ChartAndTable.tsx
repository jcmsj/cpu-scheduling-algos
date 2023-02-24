import { Paper, Typography } from "@mui/material";
import { GanttChart } from "./Gantt";
import { Table } from "./Table";
import { Result, Task } from "./Task";
export default function ChartAndTable({ result }: { result: Result<Task> }) {
    return <div>
        <Paper style={{ padding: "2vh 2vw" }}>
            <GanttChart result={result} />
        </Paper>
        {result.tasks ?
            <Paper style={{
                display: "grid",
                justifyContent: "center"
            }}>
                <Typography variant="h4" textAlign="center">Statistics</Typography>
                <Table result={result} />
            </Paper>
            : null
        }
    </div>
}