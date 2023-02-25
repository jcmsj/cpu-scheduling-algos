import { useState } from "react";
import { InputData } from "./InputData";
import { parseTasks } from "./parser";
import { Result, Task } from "./Task";
import GanttChartContainer from "./Gantt";
import StatsContainer from "./Stats";

export default function Page({
    algo,
    showPriority = false,
    showQuantum = false
}: {
    algo: (tasks: Task[]) => Result<Task>,
    showPriority?: boolean,
    showQuantum?: boolean,
}) {
    const [result, setResult] = useState<Result<Task>>({} as any);
    const [rawBursts, setRawBursts] = useState("");
    const [rawArrivals, setRawArrivals] = useState("");
    const [rawPriorities, setRawPriorities] = useState("");
    const [quantum, setQuantum] = useState(1);
    function updateTasks() {
        // Parse tasks => feed to algorithm => update gui
        if (showQuantum) {
            setResult(algo(parseTasks(rawBursts, rawArrivals, rawPriorities)));
        }  else {
            setResult(algo(parseTasks(rawBursts, rawArrivals, rawPriorities)));
        }
    }

    function prepFilter(setter: React.Dispatch<React.SetStateAction<string>>) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
        }
    }

    return <>
        <InputData
            onInputArrivals={prepFilter(setRawArrivals)}
            onInputBursts={prepFilter(setRawBursts)}
            onInputPriorities={prepFilter(setRawPriorities)}
            onInputQuantum={setQuantum}
            onSolve={updateTasks}
            showPriority={showPriority}
            showQuantum = {showQuantum}
        >
        </InputData>
        <GanttChartContainer result={result} />
        <StatsContainer result={result} />
    </>
}