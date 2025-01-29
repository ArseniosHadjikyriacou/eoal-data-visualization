import * as xlsx from 'xlsx'

export default function workbookToObject(data,sheetNumber) {
  // This function expects the first row to be data labels/headings 
  // All data columns must be labeled
  // The rest of the rows should be data
  // Sheet numbers start from 1
  // By default, all rows are parsed

  const workbook = xlsx.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[sheetNumber-1];
  const worksheet = workbook.Sheets[sheetName];

  let headings = [];
  let colNum = 0;
  while (Object.keys(worksheet).includes(colName(colNum)+'1')) {
    headings.push(worksheet[colName(colNum)+'1'].w);
    colNum++;
  }
  const arraysOfValues = Array.from(Array(headings.length), () => []);

  const json = xlsx.utils.sheet_to_json(worksheet, { raw: false });
  json.forEach((row) => {
    headings.forEach((heading,index) => {
      Object.keys(row).includes(heading) ? arraysOfValues[index].push(row[heading]) : arraysOfValues[index].push(null);
    });
  });

  const datasetObject = {};
  headings.forEach((heading,index) => {
    Object.assign(datasetObject, { [heading]: arraysOfValues[index] })
  });

  return [headings,datasetObject];
}

function colName(n) {
  var ordA = 'a'.charCodeAt(0);
  var ordZ = 'z'.charCodeAt(0);
  var len = ordZ - ordA + 1;

  var s = "";
  while(n >= 0) {
      s = String.fromCharCode(n % len + ordA) + s;
      n = Math.floor(n / len) - 1;
  }
  return s.toUpperCase();
}