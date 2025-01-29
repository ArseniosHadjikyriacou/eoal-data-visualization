import { useState } from 'react';
import { LineGraph } from './components/Line';
import DisplayOptions from './components/DisplayOptions';
import './styles/App.css'


export default function App() {

  const [keys,setKeys] = useState([]);
  const [data,setData] = useState({});

  return (
    <div className="App">
      <DisplayOptions keys={keys} setKeys={setKeys} setData={setData} />
      <LineGraph keys={keys} data={data} />
    </div>
  )
}