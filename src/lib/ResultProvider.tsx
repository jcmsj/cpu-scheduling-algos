import { useState } from "react";
import { Result, Task } from "../Task";
import { resultContext } from "./Contexts";

export function ResultProvider({children}:React.PropsWithChildren) {
    const [result, dispatch] = useState({} as Result<Task>);
    return <resultContext.Provider value={{result, dispatch}}>
        {children}
    </resultContext.Provider>
}