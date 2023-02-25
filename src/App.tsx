import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { fcfs } from './algos/fcfs';
import Page from './Page';
import DupeExample from './algos/dupeExample';

interface SubPage {
  page: JSX.Element
  name: string
}
/**
 * Each algo has its own subpage
 */
const pages:Record<string, SubPage> = {
  fcfs: {
    page: <Page algo={fcfs}/>,
    name: "First Come First Serve (FCFS)",
  },
  sjf: {
    page: <Page algo={tasks => ({/**TODO */})}/>,
    name: "Shortest Job First (SJF)",
  },
  srt: {
    page: <Page algo={tasks => ({/**TODO */})}/>,
    name: "Shortest Remaining Time (SRT)",
  },
  ps: {
    page: <Page algo={tasks => ({/**TODO */})} showPriority={true}/>,
    name: "Priority Scheduling (PS)",
  },
  rrs: {
    page: <Page algo={tasks => ({/**TODO */})}/>,
    name: "Round Robin Scheduling (RRS)",
  },
  mqs: {
    page: <Page algo={tasks => ({/**TODO */})}/>,
    name: "Multilevel Queue Scheduling (MQS)",
  },
  dup: {
    page: <Page algo={DupeExample} />,
    name: "Dupe Example"
  }
}
function App() {
  const [algoSelected, setAlgo] = useState<keyof typeof pages>("fcfs");
  return <>
    <Paper className="switcher pad">
      <Typography variant="h3">Algorithm:</Typography>
      <select value={algoSelected} onChange={e => setAlgo(e.target.value as any)}>
        {Object.entries(pages).map(([key, val]) =>
          <option value={key} key={key}>{val.name}</option>
        )}
      </select>
    </Paper>
      {pages[algoSelected].page}
  </>
}

export default App