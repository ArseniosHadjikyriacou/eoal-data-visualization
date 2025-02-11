import '../styles/Analytics.css'

export default function Analytics({data,checked,dateKey,fromDate,toDate}) {

  const date1 = new Date(fromDate);
  const date2 = new Date(toDate);
  const geDate1 = [];
  const leDate2 = [];

  data[dateKey].forEach((date,i) => {
    const dateObject = new Date(date)
    if (dateObject >= date1) {
      geDate1.push(i);
    }
    if (dateObject <= date2) {
      leDate2.push(i);
    }
  });

  const lower = Math.min(...geDate1);
  const upper = Math.max(...leDate2)+1;

  function getMeanStd (array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return [ mean , Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n) ]
  }

  function tableRow(quantity,stats) {
    return (
      <tr key={quantity}>
        <td>{quantity}</td>
        <td>{stats[0].toFixed(2)}</td>
        <td>{stats[1].toFixed(2)}</td>
      </tr>
    )
  }

  return (
    <table>
      <caption>Data analytics summary</caption>

      <thead>
        <tr>
          <th>Dataset</th>
          <th>Mean</th>
          <th>Sigma</th>
        </tr>
      </thead>

      <tbody>
        {checked.map( key => tableRow( key , getMeanStd( data[key].slice(lower,upper).filter(n => n !== null).map(Number) ) ) )}
      </tbody>

    </table>
  )
};