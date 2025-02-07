import { Line } from 'react-chartjs-2'
import { spacedColors } from '../utils/colors';
import typeChecker from '../utils/typeCheck';
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

export function LineGraph({data,xaxis,checked,rangeRef,timeRef}) {

  const dataTypeX = typeChecker(data[xaxis][0])
  const colors = spacedColors(checked.length)
  const [lower,upper] = rangeRef.current.value.split('-').map(index => Number(index))

  function timeUnit() {
    if (timeRef.current) {
      if (timeRef.current.value === 'day') {
        return 'day';
      } else if(timeRef.current.value === 'month') {
        return 'month';
      } else if(timeRef.current.value === 'year') {
        return 'year';
      }
    }
    return 'month'
  }

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
        type: dataTypeX, // linear, category or time
        time: { 
          unit: timeUnit(),
          displayFormats: {
            day: 'MMM dd',
            month: 'MMM yyyy',
            year: 'yyyy'
          }
        },
        title: {
          display: true,
          text: xaxis,
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
    labels: data[xaxis].slice(lower-1,upper-1),
    datasets: [],
  };

  checked.forEach((key,index) => {
    lineChartData.datasets.push(
      {
        label: key,
        data: data[key].slice(lower-1,upper-1),

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