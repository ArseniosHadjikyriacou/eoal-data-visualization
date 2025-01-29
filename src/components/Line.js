import { Line } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale, 
  PointElement, 
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineGraph({keys,data}) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxHeight: 0,
        },
      },
      title: {
        display: false,
      }
    },
    scales: {
      x: {
        ticks: {
          display: true,
          autoSkip: false,
          callback: function(val) {
            return this.getLabelForValue(val).slice(0,2) === '01' ? this.getLabelForValue(val) : '';
          },
        },
        grid: {
          color: function(context) {
            return context.tick.label.length > 0 ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)';
          },
        },
      },
    },
  }

  const lineChartData = {
    labels: data[keys[0]],
    datasets: [
      {
        label: keys[2],
        data: data[keys[2]],

        // line options
        borderWidth: 1,
        borderColor: 'rgba(255, 0, 0, 1)',

        // point options
        pointRadius: 3,
        pointHitRadius: 3,
        pointBorderWidth: 1,
        pointBorderColor: 'rgba(255, 0, 0, 1)',
        pointBackgroundColor: 'rgba(255, 0, 0, 0.2)',

        spanGaps: false,
      },
    ],
  };
  // Plotting is sensitive to number format. Keep decimal (.) notation


  return <Line options={options} data={lineChartData} />
};