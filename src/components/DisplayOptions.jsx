import parseWorkBook from '../utils/spreadsheets'
import '../styles/DisplayOptions.css'

export default function DisplayOptions({keys,setKeys,setData,setChecked}) {

  function readUploadFile(e) {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          // reader expects a spreadsheet file
          const workBookData = e.target.result;

          // created object keys are the table headings
          // keys point to arrays of data of equal length
          const [keys,sheetObject] = parseWorkBook(workBookData,1);
          setKeys(keys);
          setData(sheetObject);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

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

      <form className='upload-form'>
        <label htmlFor="upload">Upload spreadsheet:</label>
        <input className="browse" type="file" name="upload" id="upload" onChange={readUploadFile}/>
      </form>

      <form className='checkbox-form' onChange={handleCheckBox}>
        {checkboxElements()}
      </form>
      
    </>
  )

};