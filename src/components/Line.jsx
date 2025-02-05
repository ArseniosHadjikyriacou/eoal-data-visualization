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

export function LineGraph({keys,data,checked}) {

  const generateColours = ({ quantity = 1, shuffle = false, order = "0,360", offset = 0, saturation = 80, lightness = 50 }) => {
    let colours = [];
    for (let i = 0; i < quantity; i++) {
        let hue;
        if (order === "0,360") hue = ((360/quantity) * (quantity+i)) - 360;
        if (order === "360,0") hue = (360/quantity) * (quantity-i);

        hue += offset;

        colours.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    if (shuffle) {
        // uses the Fisher-Yates Shuffle to shuffle the colours
        let currentIndex = colours.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [colours[currentIndex], colours[randomIndex]] = [colours[randomIndex], colours[currentIndex]];
        }
    }

    return colours;
  };

  const colors = generateColours({quantity: keys.length})

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
  };

  const lineChartData = {
    labels: data[keys[0]],
    datasets: [],
  };

  keys.forEach((key,index) => {
    if (checked.includes(key)) {
      lineChartData.datasets.push(
        {
          label: key,
          data: data[key],
  
          // line options
          borderWidth: 1,
          borderColor: colors[index],
  
          // point options
          pointRadius: 2,
          pointHitRadius: 2,
          pointBorderWidth: 1,
          pointBorderColor: colors[index],
          pointBackgroundColor: colors[index],
  
          spanGaps: true,
        }
      );
    }
  });
  // Plotting is sensitive to number format. Keep decimal (.) notation


  return <Line options={options} data={lineChartData} />
};