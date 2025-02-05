import { useState } from 'react';
import { sheetNames } from '../utils/spreadsheets'
import '../styles/DisplayOptions.css'

export default function DisplayOptions({keys,setKeys,setData,setChecked}) {
  
  const [sheets,setSheets] = useState([]); //sheet names
  const [workBook,setWorkbook] = useState([]); // workbook data

  function readUploadSheets(e) {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          // reader expects a spreadsheet file
          const byteData = e.target.result;
          setSheets(sheetNames(byteData));
          setWorkbook(byteData);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  // handleSelectSheet(e) {
  //   // created object keys are the table headings
  //   // keys point to arrays of data of equal length
  //   const [keys,sheetObject] = workbookToObject(workBook,e);
  //   setKeys(keys);
  //   setData(sheetObject);
  // }

  function checkboxElements() {
    const checkboxes = keys.slice(2).map(key => {
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
          <label htmlFor="sheetSelect">Please select a worksheet:</label> <br/>
          <select id="sheetSelect" name="sheetSelect" defaultValue="">
            <option value="" disabled>-- Select a worksheet --</option>
            {sheets.map(sheet => <option value={sheet} key={sheet}>{sheet}</option>)}
          </select>
        </form>}

        <a className='dummy-data' href="./Melbourne-WWTP.xlsx" download>Download Dummy Data</a>

      </div>

      Filters (datasets and dates):
      <form className='checkbox-form' onChange={handleCheckBox}>
        {checkboxElements()}
      </form>

    </>
  )

};