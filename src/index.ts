import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
import 'chartjs-plugin-dragdata';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { itemData } from './data/itemData';
import { values } from './types/values';

const ctx = document.querySelector('#chart-view > canvas');

const data = {
  labels: ['攻撃[05]', '防御[05]', '増幅[05]', '生存[05]', '命中[05]', '状態[05]', '祝福[05]'],
  datasets: [{
    label: 'LABEL',
    data: [5, 5, 5, 5, 5, 5, 5],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)',
    pointHitRadius: 25
  }]
}

const options = {
  elements: {
    line: {
      borderWidth: 3
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      max: 20,
      min: 0,
      ticks: {
        stepSize: 2
      },
      pointLabels: {
        font: {
          size: 12
        }
      }
    }
  },
  onHover: function (e: any) {
    const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
    if (point.length) e.native.target.style.cursor = 'grab'
    else e.native.target.style.cursor = 'default'
  },
  plugins: {
    title: {
      display: true,
      text: ' 魂吸収効果シミュレーター'
    },
    legend: {
      display: false
    },
    dragData: {
      magnet: { to: Math.round },
      round: 1,
      showTooltip: true,
      onDragStart: function (e: any) {
        //console.log(e)
      },
      onDrag: function (e: any, datasetIndex: number, index: number, value: number) {
        e.target.style.cursor = 'grabbing'
        //console.log(e, datasetIndex, index, value)
      },
      onDragEnd: function (e: any, datasetIndex: number, index: number, value: number) {
        e.target.style.cursor = 'default'
        //data.labels[index] = value.toString().padStart(2, '0')
        //data.labels[index] = data.labels[index].replace(/\[.*?\]/, `[${value.toString().padStart(2, '0')}]`)
        //myChart.update()
        //console.log(myChart.data.datasets[0].data)
        update(index, value);
      }
    }
  }
}

function update(index: number, value: number) {
  // ラベル更新
  data.labels[index] = data.labels[index].replace(/\[.*?\]/, `[${value.toString().padStart(2, '0')}]`);
  myChart.update();

  // ポイント更新
  let point: number = 0;
  // チャートの全項目（0～6）
  for (let i: number = 0; i < 7; i++) {
    // 項目ごとの現在値（0～20（最大））
    const data: number = myChart.data.datasets[0].data[i];

    // 項目ごとの設定値（0~20全て）
    const values: values = itemData[i];

    // 項目ごとの設定値から0~現在値までポイントを加算
    for (let j: number = 0; j <= data; j++) {
      point += values[j].point;
    }
  }
  
  document.getElementById('point')!.textContent = point.toString();

  // ステータス更新
  
}

//@ts-ignore
const myChart = new Chart(ctx, {
  type: 'radar',
  data: data,
  options: options,
});

// 初期表示
update(0, myChart.data.datasets[0].data[0]);