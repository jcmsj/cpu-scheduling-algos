import { useState } from "react";
import ChartAndTable from "./ChartAndTable";
import { InputData } from "./InputData";
import { Result, Task } from "./Task";

export function SJFPage() {
    const [result, setResult] = useState<Result<Task>>({} as any)
    return <>
        <InputData>
        </InputData>
        <ChartAndTable result={result} />
    </>
}