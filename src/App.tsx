import { useEffect, useState } from 'react';
import { fcfs } from './algos/fcfs'
import { Task } from './Task';
import FCFSPage from './fcfs';
function App() {
  const [algoSelected, setAlgo] = useState("fcfs");
  const [tasks, setTasks] = useState<Task[]>([]);
  /* useEffect(() => {
    const { avgTurnAroundTime, avgWaitingTime } = fcfs(    
      [{
        id: 1,
        burstTime: 10,
        waitingTime: 0,
        turnAroundTime: 0,
      }, {
        id: 2,
        burstTime: 5,
        waitingTime: 0,
        turnAroundTime: 0,
      }, {
        id: 3,
        burstTime: 8,
        waitingTime: 0,
        turnAroundTime: 0,
      }]);

      console.table({ avgTurnAroundTime, avgWaitingTime });
      console.table(tasks);
    }, tasks.length); */
  return <>
    <select value={algoSelected} onChange={e => setAlgo(e.target.value)}>
      <option value="fcfs">First Come First Serve (FCFS)</option>
      <option value="sjf">Shortest Job First (SJF)</option>
      <option value="srt">Shortest Remaining Time (SRT)</option>
      <option value="ps">Priority Scheduling (PS)</option>
      <option value="rrs">Round Robin Scheduling (RRS)</option>
      <option value="mqs">Multilevel Queue Scheduling (MQS)</option>
    </select>
    <FCFSPage></FCFSPage>
  </>
}

export default App
