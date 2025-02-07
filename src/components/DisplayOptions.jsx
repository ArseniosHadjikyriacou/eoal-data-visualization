import { useState,useRef } from 'react';
import { sheetNames,workbookToObject } from '../utils/spreadsheets'
import typeChecker from '../utils/typeCheck';
import '../styles/DisplayOptions.css'

export default function DisplayOptions({keys,data,xaxis,setXaxis,setKeys,setData,setChecked,rangeRef,timeRef}) {
  
  const [sheets,setSheets] = useState([]); // sheet names
  const [workBook,setWorkbook] = useState([]); // workbook data
  const sheetSelectElem = useRef(null);
  const xaxisSelectElem = useRef(null);

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
          setXaxis('');
          setChecked([]);
          if (sheetSelectElem.current) {
            sheetSelectElem.current.value = "";
          }
          if (xaxisSelectElem.current) {
            xaxisSelectElem.current.value = "";
          }
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
    setXaxis('');
    setChecked([]);
    if (xaxisSelectElem.current) {
      xaxisSelectElem.current.value = "";
    }
  }

  function handleSelectXaxis(e) {
    setXaxis(e.target.value);
  }

  function checkboxElements() {

    const filteredKeys = keys.filter(key => (key !== xaxis && typeChecker(data[key][0]) === 'linear'));

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

        {keys.length > 0 &&
        <form className='x-axis-form'>
          <label htmlFor="x-axisSelect">Select x-axis:</label> <br/>
          <select id="x-axisSelect" name="x-axisSelect" defaultValue="" onChange={handleSelectXaxis} ref={xaxisSelectElem}>
            <option value="" disabled>-- Select x-axis --</option>
            {keys.map(key => <option value={key} key={key}>{key}</option>)}
          </select>
        </form>}

        <a className='dummy-data' href="./DummyData.xlsx" download>Download Dummy Data</a>

      </div>

      {(keys.length > 0 && xaxis.length > 0) && 
      <form className='range-form'>
        <label htmlFor="range">Data index range:</label>
        <input 
          type="text" 
          id="range" 
          name="range"
          ref={rangeRef}
          className='range-input'
          placeholder={`1-${data[xaxis].length}`} 
          defaultValue={`1-${data[xaxis].length}`}>
        </input>

        {(typeChecker(data[xaxis][0]) === 'time') &&
        <>
        <label htmlFor="time">Time intervals:</label>
        <input 
          type="text" 
          id="time" 
          name="time-intervals"
          ref={timeRef}
          className='time-input'
          placeholder='day or month or year'
          defaultValue=''>
        </input>
        </>}

      </form>}

      {(keys.length > 0 && xaxis.length > 0) &&
      <>
      Datasets to plot:
      <form className='checkbox-form' onChange={handleCheckBox}>
        {checkboxElements()}
      </form>
      </>}

    </>
  )

};