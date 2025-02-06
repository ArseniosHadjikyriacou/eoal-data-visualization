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

export function LineGraph({data,xaxis,checked}) {

  const dataTypeX = typeChecker(data[xaxis][0])
  const colors = spacedColors(checked.length)

  const options = {
    events: [], // static chart
    responsive: true,
    plugins: {
      title: { display: false },
      tooltip: { enabled: false }, // no tooltip when hovering
      legend: {
        position: "top",
        labels: { boxHeight: 0 },
      },
    },
    scales: {
      x: {
        type: dataTypeX, // linear, category or time
        time: { unit: 'month' },
        ticks: {
          display: true,
          // autoSkip: false,
          // callback: function(val) {
          //   return this.getLabelForValue(val).slice(0,2) === '01' ? this.getLabelForValue(val) : '';
          // },
        },
        // grid: {
        //   color: function(context) {
        //     return context.tick.label.length > 0 ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)';
        //   },
        // },
      },
    },
  };

  const lineChartData = {
    labels: data[xaxis],
    datasets: [],
  };

  checked.forEach((key,index) => {
    lineChartData.datasets.push(
      {
        label: key,
        data: data[key],

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
  // Plotting is sensitive to number format. Keep decimal (.) notation


  return <Line options={options} data={lineChartData} />
};