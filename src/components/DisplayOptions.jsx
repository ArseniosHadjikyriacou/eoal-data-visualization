import { useState,useRef } from 'react';
import { sheetNames,workbookToObject } from '../utils/spreadsheets'
import typeChecker from '../utils/typeCheck';
import '../styles/DisplayOptions.css'

export default function DisplayOptions({keys,data,dateKey,fromDate,toDate,setKeys,setData,setChecked,setDateKey,setFromDate,setToDate,setTimeUnits}) {
  
  const [sheets,setSheets] = useState([]); // sheet names
  const [workBook,setWorkbook] = useState([]); // workbook data
  const sheetSelectElem = useRef(null);

  function readUploadSheets(e) {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          // reader expects a spreadsheet file
          const byteData = e.target.result;
          setSheets(sheetNames(byteData));
          setWorkbook(byteData);
          setKeys([]);
          setChecked([]);
          if (sheetSelectElem.current) {
            sheetSelectElem.current.value = "";
          }
          setFromDate('');
          setToDate('');
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  function handleSelectSheet(e) {
    // created object keys are the table headings
    // keys point to arrays of data of equal length
    const [keys,sheetObject] = workbookToObject(workBook,e.target.value);
    setKeys(keys);
    setData(sheetObject);
    setChecked([]);
    keys.forEach(key => {
      if (key.toUpperCase() === 'DATE') {
        setDateKey(key);
        setFromDate(sheetObject[key][0]);
        setToDate(sheetObject[key].slice(-1)[0]);
      }
    });
  }

  function checkboxElements() {

    const filteredKeys = keys.filter(key => (key !== dateKey && typeChecker(data[key][0]) === 'linear'));

    const checkboxes = filteredKeys.map(key => {
      return (
        <div className='checkbox-container' key={key}>
          <label className='checkbox-label' htmlFor={key}>{key}</label>
          <input className='checkbox' type="checkbox" id={key} name='headings' value={key}/> 
        </div>
      )
    });

    return checkboxes;

  }

  function handleCheckBox(event) {
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const checkedBoxes = formData.getAll('headings');
    setChecked(checkedBoxes);
  }


  return (
    <>

      <div className='data-input-section'>

        <form className='upload-form'
        style={sheets.length > 0 ? {backgroundColor: "rgb(239, 212, 79)"} : {backgroundColor: "rgb(33,163,102)"}}>
          <label htmlFor="upload">Please upload the spreadsheet file you would like to visualize:</label> <br/>
          <input 
            type="file" 
            name="upload" 
            id="upload" 
            accept=".xlsx,.xls"
            onChange={readUploadSheets}/>
        </form>

        {sheets.length > 0 && 
        <form className='sheet-form'>
          <label htmlFor="sheetSelect">Select worksheet:</label> <br/>
          <select id="sheetSelect" name="sheetSelect" defaultValue="" onChange={handleSelectSheet} ref={sheetSelectElem}>
            <option value="" disabled>-- Select worksheet --</option>
            {sheets.map(sheet => <option value={sheet} key={sheet}>{sheet}</option>)}
          </select>
        </form>}

        <a className='dummy-data' href="./DummyData.xlsx" download>Download Dummy Data</a>

      </div>

      {keys.length > 0 && 
      <form className='date-form'>

        <label htmlFor="date1">From:</label>
        <input 
          type="date" 
          name='date1' 
          id='date1'
          value={fromDate}
          min={data[dateKey][0]}
          max={toDate}
          placeholder="YYYY-MM-DD"
          onChange={e => setFromDate(e.target.value)}
        />

        <label htmlFor="date2">To:</label>
        <input 
          type="date" 
          name='date2' 
          id='date2' 
          value={toDate}
          min={fromDate}
          max={data[dateKey].slice(-1)[0]}
          placeholder="YYYY-MM-DD"
          onChange={e => setToDate(e.target.value)}
        />

        <label htmlFor="time-units">Select time interval:</label> <br/>
        <select id="time-units" name="time-units" defaultValue="month" onChange={e => setTimeUnits(e.target.value)}>
          <option value="" disabled>-- Select time interval --</option>
          <option value='day'>Day</option>
          <option value='month'>Month</option>
          <option value='year'>Year</option>
        </select>

      </form>}

      {keys.length > 0 &&
      <>
      Datasets to plot:
      <form className='checkbox-form' onChange={handleCheckBox}>
        {checkboxElements()}
      </form>
      </>}

    </>
  )

};