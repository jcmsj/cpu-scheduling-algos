import { useState } from "react";
import { fcfs } from "./algos/fcfs";
import { InputData } from "./InputData";
import { parseTasks } from "./parser";
import ChartAndTable from "./ChartAndTable";
import { Result, Task } from "./Task";

export default function FCFSPage() {
    const [result, setResult] = useState<Result<Task>>({} as any);
    const [rawBursts, setRawBursts] = useState("");
    const [rawArrivals, setRawArrivals] = useState("");
    function updateTasks() {
        // Parse tasks => feed to algorithm => update gui
        setResult(fcfs(parseTasks(rawBursts, rawArrivals)));
    }

    function prepFilter(setter: React.Dispatch<React.SetStateAction<string>>) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
        }
    }

    return <>
        <InputData
            onInputArrival={prepFilter(setRawArrivals)}
            onInputBurst={prepFilter(setRawBursts)}
            onSolve={updateTasks}
        >
        </InputData>
        <ChartAndTable result={result} />
    </>
}