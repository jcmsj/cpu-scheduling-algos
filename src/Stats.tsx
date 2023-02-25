import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import NoData from "./NoData";
import { Result, Task } from "./Task";

const headers = ["Task", "Arrival Time", "Burst Time", "Finish Time", "Turn Around Time", "Waiting Time"];
export function Stats({ result }: { result: Result<Task> }) {
    return <TableContainer component="table">
        <TableHead>
            <TableRow>
                {headers.map(title =>
                    <TableCell key={title}>{title}</TableCell>
                )}
            </TableRow>
        </TableHead>
        <TableBody>
            {result.tasks.map(task =>
                <TableRow hover key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.arrivalTime}</TableCell>
                    <TableCell>{task.burstTime}</TableCell>
                    <TableCell>{task.finishTime}</TableCell>
                    <TableCell>{task.turnAroundTime}</TableCell>
                    <TableCell>{task.waitingTime}</TableCell>
                </TableRow>)}
            <TableRow>
                <TableCell colSpan={4} align="right">Average:</TableCell>
                <TableCell>{result.total.turnAroundTime} / {result.tasks.length} = {result.average.turnAroundTime}</TableCell>
                <TableCell>{result.total.waitingTime} / {result.tasks.length} = {result.average.waitingTime}</TableCell>
            </TableRow>
        </TableBody>
    </TableContainer>
}

export default function StatsContainer({ result }: { result: Result<Task> }) {
    return <Paper
        className="stat"
        style={{
            display: "grid",
            justifyContent: "center"
        }}>
        <Typography variant="h3" textAlign="center">Statistics</Typography>
        {result.tasks ?
            <Stats result={result} />
            : <NoData />
        }
    </Paper>
}