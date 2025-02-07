import { useState,useRef } from 'react';
import { LineGraph } from './components/Line';
import Header from './components/Header';
import DisplayOptions from './components/DisplayOptions';
import './styles/App.css'


export default function App() {

  const [keys,setKeys] = useState([]);
  const [data,setData] = useState({});
  const [xaxis,setXaxis] = useState('');
  const [checked,setChecked] = useState([]);
  const rangeRef = useRef(null);
  const timeRef = useRef(null);
  

  return (
    <div className="App">

      <Header />

      <div className='main-app-container'>

        <DisplayOptions 
          keys={keys} data={data} xaxis={xaxis} 
          setXaxis={setXaxis} setKeys={setKeys} setData={setData} setChecked={setChecked}
          rangeRef={rangeRef} timeRef={timeRef} />

        { (checked.length > 0 && xaxis.length > 0) && 
        <LineGraph data={data} xaxis={xaxis} checked={checked} rangeRef={rangeRef} timeRef={timeRef} /> }

      </div>

    </div>
  )
}