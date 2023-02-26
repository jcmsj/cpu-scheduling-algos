import { Paper, Typography, TextField, Button } from "@mui/material";
import React from "react";

export function InputData({
    onInputArrivals,
    onInputBursts,
    onInputPriorities,
    onInputQuantum,
    onSolve,
    showPriority = false,
    showQuantum = false,
    children }: {
        onInputArrivals: React.ChangeEventHandler,
        onInputBursts: React.ChangeEventHandler,
        onInputPriorities?: React.ChangeEventHandler,
        onInputQuantum: React.Dispatch<React.SetStateAction<number>>,
        onSolve: React.MouseEventHandler<HTMLButtonElement>,
        showPriority?: boolean,
        showQuantum?: boolean,
    } & React.PropsWithChildren) {
    return <Paper
        className="input"
        style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "2vh",
            padding: "1vh 1vw"
        }}>
        <Typography variant="h3">Input</Typography>
        <TextField
            required
            label="Arrival times (space separated)"
            placeholder="e.g. 0 1 2"
            id="arrivals"
            onChange={onInputArrivals}
        >
        </TextField>
        <TextField
            required
            label="Burst times (space separated)"
            onChange={onInputBursts}
            id="bursts"
            placeholder="e.g. 2 4 6"
        />
        {showPriority ?
            <TextField
                required
                label="Priorities (space separated)"
                placeholder="e.g. 0 1 3"
                onChange={onInputPriorities}
                id="prios"
            /> : null
        }
        {showQuantum ?
            <TextField
                required
                label="Time quantum"
                placeholder="2"
                type="number"
                id="quantum"
                onChange={e => onInputQuantum(parseInt(e.target.value))}
            /> : null
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