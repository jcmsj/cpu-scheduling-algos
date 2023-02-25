import { useState } from "react";
import { InputData } from "./InputData";
import { parseTasks } from "./parser";
import { Result, Task } from "./Task";
import GanttChartContainer from "./Gantt";
import StatsContainer from "./Stats";

interface PageProps {
    algo: (tasks: Task[], quantum?: number) => Result<Task>;
    showPriority?: boolean;
    showQuantum?: boolean;
}

export default function Page({
    algo,
    showPriority = false,
    showQuantum = false
}: PageProps) {
    const [result, setResult] = useState<Result<Task>>({} as any);
    const [rawBursts, setRawBursts] = useState("");
    const [rawArrivals, setRawArrivals] = useState("");
    const [rawPriorities, setRawPriorities] = useState("");
    const [quantum, setQuantum] = useState(1);
    function updateTasks() {
        // Parse tasks => feed to algorithm => update gui
        setResult(algo(parseTasks(rawBursts, rawArrivals, rawPriorities), quantum));
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
            showQuantum={showQuantum}
        >
        </InputData>
        <GanttChartContainer result={result} />
        <StatsContainer result={result} />
    </>
}