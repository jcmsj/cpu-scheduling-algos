import { useEffect, useState } from 'react';
import FCFSPage from './fcfs';
function App() {
  const [algoSelected, setAlgo] = useState("fcfs");
  return <>
    <select value={algoSelected} onChange={e => setAlgo(e.target.value)}>
      <option value="fcfs">First Come First Serve (FCFS)</option>
      <option value="sjf">Shortest Job First (SJF)</option>
      <option value="srt">Shortest Remaining Time (SRT)</option>
      <option value="ps">Priority Scheduling (PS)</option>
      <option value="rrs">Round Robin Scheduling (RRS)</option>
      <option value="mqs">Multilevel Queue Scheduling (MQS)</option>
    </select>
    <br />
    <br />

    <FCFSPage></FCFSPage>
  </>
}

export default App
