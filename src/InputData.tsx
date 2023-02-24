import { Paper, Typography, TextField, Button } from "@mui/material";
import React from "react";

export function InputData({
    onInputArrivals,
    onInputBursts,
    onInputPriorities,
    onSolve,
    showPriority = false,
    children }: {
        onInputArrivals: React.ChangeEventHandler,
        onInputBursts: React.ChangeEventHandler,
        onInputPriorities?: React.ChangeEventHandler,
        onSolve: React.MouseEventHandler<HTMLButtonElement>,
        showPriority?: boolean,
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
            onChange={onInputArrivals}
        >
        </TextField>
        <TextField
            required
            label="Burst times (space separated)"
            onChange={onInputBursts}
        />
        {showPriority?
            <TextField
            required
            label="Priorities (space separated)"
            onChange={onInputPriorities}
            />:null
        }
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