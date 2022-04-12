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

const status: values = [
  {point: 0, item1: 0, item2: 0, item3: 0, item4: 0, item5: 0, item6: 0, item7: 0, item8: 0, item9: 0},
];

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

  // 初期化
  status[0] = {point: 0, item1: 0, item2: 0, item3: 0, item4: 0, item5: 0, item6: 0, item7: 0, item8: 0, item9: 0}
  document.querySelector('#status-view > table > tbody')!.innerHTML = '';

  // ポイント更新
  // チャートの全項目（0～6）
  for (let i: number = 0; i < 7; i++) {
    // 項目ごとの現在値（0～20（最大））
    const data: number = myChart.data.datasets[0].data[i];

    // 項目ごとの設定値（0~20全て）
    const values: values = itemData[i];

    // 項目ごとの設定値から0~現在値までポイントを加算
    for (let j: number = 0; j <= data; j++) {
      status[0].point += values[j].point;
      status[0].item1 += values[j].item1;
      status[0].item2 += values[j].item2;
      status[0].item3 += values[j].item3;
      status[0].item4 += values[j].item4;
      status[0].item5 += values[j].item5;
      status[0].item6 += values[j].item6;
      status[0].item7 += values[j].item7;
      status[0].item8 += values[j].item8;
      status[0].item9 += values[j].item9;
    }
  }
  
  document.getElementById('point')!.textContent = status[0].point.toString();

  // ステータス更新
  if (status[0].item1 > 0) addRow('item1', status[0].item1.toString());
  if (status[0].item2 > 0) addRow('item2', status[0].item2.toString());
  if (status[0].item3 > 0) addRow('item3', status[0].item3.toString());
  if (status[0].item4 > 0) addRow('item4', status[0].item4.toString());
  if (status[0].item5 > 0) addRow('item5', status[0].item5.toString());
  if (status[0].item6 > 0) addRow('item6', status[0].item6.toString());
  if (status[0].item7 > 0) addRow('item7', status[0].item7.toString());
  if (status[0].item8 > 0) addRow('item8', status[0].item8.toString());
  if (status[0].item9 > 0) addRow('item9', status[0].item9.toString());
}

function addRow(itemName: string, value: string) {
  const table: HTMLTableElement = <HTMLTableElement>document.querySelector('#status-view > table');
  const row: HTMLTableRowElement = table.insertRow(-1);
  const cell1: HTMLTableCellElement = row.insertCell(-1);
  const cell2: HTMLTableCellElement = row.insertCell(-1);
  cell1.innerHTML = itemName;
  cell2.innerHTML = value;
}

const ctx = document.querySelector('#chart-view > canvas');

//@ts-ignore
const myChart = new Chart(ctx, {
  type: 'radar',
  data: data,
  options: options,
});

// 初期表示
update(0, myChart.data.datasets[0].data[0]);