import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import FCFSPage from './fcfs';
import styles from "./layout.module.css";
import { SJFPage } from './SJF';

/**
 * Each algo has its own subpage
 */
const pages = {
  fcfs: {
    page: <FCFSPage></FCFSPage>,
    name: "First Come First Serve (FCFS)",
  },
  sjf: {
    page: <SJFPage></SJFPage>,
    name: "Shortest Job First (SJF)",
  },
  srt: {
    page: <></>,
    name: "Shortest Remaining Time (SRT)",
  },
  ps: {
    page: <></>,
    name: "Priority Scheduling (PS)",
  },
  rrs: {
    page: <></>,
    name: "Round Robin Scheduling (RRS)",
  },
  mqs: {
    page: <></>,
    name: "Multilevel Queue Scheduling (MQS)",
  }
}
function App() {
  const [algoSelected, setAlgo] = useState<keyof typeof pages>("fcfs");
  return <>
    <Paper>
      <Typography variant="h4">Algorithm:</Typography>
      <select value={algoSelected} onChange={e => setAlgo(e.target.value as any)}>
        {Object.entries(pages).map(([key, val]) =>
          <option value={key} key={key}>{val.name}</option>
        )}
      </select>
    </Paper>
    <div className={styles.divider}>
      {pages[algoSelected].page}
    </div>
  </>
}

export default App
