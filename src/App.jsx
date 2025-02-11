import { useState } from 'react';
import Header from './components/Header';
import DisplayOptions from './components/DisplayOptions';
import Analytics from './components/Analytics';
import { LineGraph } from './components/Line';
import './styles/App.css'


export default function App() {

  const [keys,setKeys] = useState([]);
  const [data,setData] = useState({});
  const [checked,setChecked] = useState([]);
  const [dateKey,setDateKey] = useState('date');
  const [fromDate,setFromDate] = useState('');
  const [toDate,setToDate] = useState('');
  const [timeUnit,setTimeUnits] = useState('month');
  

  return (
    <div className="App">

      <Header />

      <div className='main-app-container'>

        <DisplayOptions 
          keys={keys} data={data} dateKey={dateKey} fromDate={fromDate} toDate={toDate}
          setKeys={setKeys} setData={setData} setChecked={setChecked} 
          setDateKey={setDateKey} setFromDate={setFromDate} setToDate={setToDate} setTimeUnits={setTimeUnits}
        />

        { checked.length > 0 && 
        <LineGraph 
          data={data} checked={checked} 
          dateKey={dateKey} fromDate={fromDate} toDate={toDate} timeUnit={timeUnit}
        /> 
        }

        { checked.length > 0 && 
        <Analytics
          data={data} checked={checked} 
          dateKey={dateKey} fromDate={fromDate} toDate={toDate} timeUnit={timeUnit}
        /> 
        }

      </div>

    </div>
  )
}