import * as xlsx from 'xlsx'

export function sheetNames (byteData) {
  return xlsx.read(byteData, { type: "array" }).SheetNames;
}

export function workbookToObject(byteData,sheetName) {
  // This function expects the first row to be data labels/headings 
  // All data columns must be labeled
  // The rest of the rows should be data
  // By default, all rows are parsed

  const workbook = xlsx.read(byteData, { type: "array" });
  const worksheet = workbook.Sheets[sheetName];

  let headings = [];
  let colNum = 0;
  while (Object.keys(worksheet).includes(colChar(colNum)+'1')) {
    headings.push(worksheet[colChar(colNum)+'1'].w);
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

function colChar(n) {
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