import { MenuItem, Paper, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { fcfs } from './algos/fcfs';
import Page from './Page';
import { ps } from './algos/ps';
import { srtf } from './algos/srtf';
import { sjf } from './algos/sjf';

interface SubPage {
  page: JSX.Element
  name: string
}
/**
 * Each algo has its own subpage
 */

function App() {
  const [algoSelected, setAlgo] = useState<keyof typeof pages>("fcfs");

  const pages: Record<string, SubPage> = {
    fcfs: {
      page: <Page algo={fcfs} />,
      name: "First Come First Serve (FCFS)",
    },
    sjf: {
      page: <Page algo={sjf} />,
      name: "Shortest Job First (SJF)",
    },
    srt: {
      page: <Page algo={srtf} />,
      name: "Shortest Remaining Time (SRT)",
    },
    ps: {
      page: <Page algo={ps} showPriority={true} />,
      name: "Priority Scheduling - Non-preemptive (PS)",
    },
    rrs: {
      page: <Page algo={tasks => ({/**TODO */ })} showQuantum={true} />,
      name: "Round Robin Scheduling (RRS)",
    },
    mqs: {
      page: <Page algo={tasks => ({/**TODO */ })} />,
      name: "Multilevel Queue Scheduling (MQS)",
    }
  }
  return <>
    <Paper className="switcher pad">
      <Typography variant="h3">Algorithm:</Typography>
      <Select
        value={algoSelected}
        onChange={e => setAlgo(e.target.value as any)}
      >
        {Object.entries(pages).map(([key, val]) =>
          <MenuItem value={key} key={key}>{val.name}</MenuItem>
        )}
      </Select>
    </Paper>
    {pages[algoSelected].page}
  </>
}

export default App