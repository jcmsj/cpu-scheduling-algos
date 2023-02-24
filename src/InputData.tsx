import { Paper, Typography, TextField, Button } from "@mui/material";
import React from "react";

export function InputData({
    onInputArrival,
    onInputBurst,
    onSolve,
    children }: {
        onInputArrival: (e: React.ChangeEvent<HTMLInputElement>) => void,
        onInputBurst: (e: React.ChangeEvent<HTMLInputElement>) => void,
        onSolve: React.MouseEventHandler<HTMLButtonElement>
    } & React.PropsWithChildren) {
    return <Paper style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2vh",
        padding: "1vh 1vw"
    }}>
        <Typography variant="h3">Input</Typography>
        <TextField
            required
            label="Arrival times (space separated)"
            onChange={onInputArrival}
        >
        </TextField>
        <TextField
            required
            label="Burst times (space separated)"
            onChange={onInputBurst}
        />
        {children}
        <span>
            <Button
                variant="contained"
                onClick={onSolve}
            >Calculate
            </Button>
        </span>
    </Paper>
}