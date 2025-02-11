import { Line } from 'react-chartjs-2'
import { spacedColors } from '../utils/colors';
import 'chartjs-adapter-date-fns';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  TimeScale,
  PointElement, 
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale, 
  TimeScale,
  PointElement, 
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineGraph({data,checked,dateKey,fromDate,toDate,timeUnit}) {

  const colors = spacedColors(checked.length);
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

  const options = {
    events: [], // static chart
    responsive: true,
    plugins: {
      title: { display: false },
      tooltip: { enabled: false }, // no tooltip when hovering
      legend: {
        position: "top",
        font: { size: 20},
        labels: { boxHeight: 0, color: 'black' },
      }
    },
    scales: {
      x: {
        type: 'time', // linear, category or time
        time: { 
          unit: timeUnit,
          displayFormats: {
            day: 'MMM dd',
            month: 'MMM yyyy',
            year: 'yyyy'
          }
        },
        title: {
          display: true,
          text: dateKey,
          padding: { top: 0 },
          font: { size: 24},
          color: 'black'
        },
        ticks: { color: "black" }
      },
      y: {
        ticks: { color: "black" }
      }
    }
  };

  const lineChartData = {
    labels: data[dateKey].slice(lower,upper),
    datasets: [],
  };

  checked.forEach((key,index) => {
    lineChartData.datasets.push(
      {
        label: key,
        data: data[key].slice(lower,upper),

        // line options
        borderWidth: 1,
        borderColor: colors[index],

        // point options
        pointRadius: 0,
        pointHitRadius: 2,
        pointBorderWidth: 1,
        pointBorderColor: colors[index],
        pointBackgroundColor: colors[index],

        spanGaps: true,
      }
    );
  });


  return <Line options={options} data={lineChartData} />
};