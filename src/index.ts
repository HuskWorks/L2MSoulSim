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
  { Point: 0, CriticalHit: 0, AllDamage: 0, Accuracy: 0, DoubleChance: 0, ExtraPvEDamage: 0, IgnoreDamageResistance: 0, ExtraPvPDamage: 0, IgnoreExtraReductionToStunned: 0, MaxHP: 0, PvPWeaponDefense: 0, CriticalHitResistance: 0, PvPSkillDefense: 0, WeaponBlock: 0, DamageReduction: 0, Defense: 0, ExtraDamageOnCriticalHit: 0, SkillDamageBoost: 0, WeaponDamageBoost: 0, AllTypeBoost: 0, BlockPenetration: 0, PvPDamageResistance: 0, PotionRecoveryRate: 0, HealBoost: 0, DoubleResistance: 0, DamageResistance: 0, CCAccuracy: 0, PvEAccuracy: 0, ExtraAccuracyToStunned: 0, PvPAccuracy: 0, SkillAccuracy: 0, AbsoluteAccuracy: 0, StunAccuracy: 0, HoldAccuracy: 0, SkillResistance: 0, CCDurationReduction: 0, HoldResistance: 0, WeaponDefense: 0, SkillDefense: 0, StunResistance: 0, AggressionResistance: 0, SilenceResistance: 0, CCStackResistance: 0, BlessingsRechargeIncrease: 0, BasicAttackDamage: 0, BasicAttackCriticalHit: 0, BasicAttackDamageResistance: 0, BasicAttackDamageReduction: 0, BasicAttackCriticalHitResistance: 0, BlessingsConservation: 0, BasicAttackDamageBoost: 0, BonusEXP: 0 },
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
      text: 'リネージュ2M 魂吸収効果シミュレーター'
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
      },
      onDragEnd: function (e: any, datasetIndex: number, index: number, value: number) {
        e.target.style.cursor = 'default'
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
  status[0] = { Point: 0, CriticalHit: 0, AllDamage: 0, Accuracy: 0, DoubleChance: 0, ExtraPvEDamage: 0, IgnoreDamageResistance: 0, ExtraPvPDamage: 0, IgnoreExtraReductionToStunned: 0, MaxHP: 0, PvPWeaponDefense: 0, CriticalHitResistance: 0, PvPSkillDefense: 0, WeaponBlock: 0, DamageReduction: 0, Defense: 0, ExtraDamageOnCriticalHit: 0, SkillDamageBoost: 0, WeaponDamageBoost: 0, AllTypeBoost: 0, BlockPenetration: 0, PvPDamageResistance: 0, PotionRecoveryRate: 0, HealBoost: 0, DoubleResistance: 0, DamageResistance: 0, CCAccuracy: 0, PvEAccuracy: 0, ExtraAccuracyToStunned: 0, PvPAccuracy: 0, SkillAccuracy: 0, AbsoluteAccuracy: 0, StunAccuracy: 0, HoldAccuracy: 0, SkillResistance: 0, CCDurationReduction: 0, HoldResistance: 0, WeaponDefense: 0, SkillDefense: 0, StunResistance: 0, AggressionResistance: 0, SilenceResistance: 0, CCStackResistance: 0, BlessingsRechargeIncrease: 0, BasicAttackDamage: 0, BasicAttackCriticalHit: 0, BasicAttackDamageResistance: 0, BasicAttackDamageReduction: 0, BasicAttackCriticalHitResistance: 0, BlessingsConservation: 0, BasicAttackDamageBoost: 0, BonusEXP: 0 };
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
      status[0].Point += values[j].Point
      status[0].CriticalHit += values[j].CriticalHit
      status[0].AllDamage += values[j].AllDamage
      status[0].Accuracy += values[j].Accuracy
      status[0].DoubleChance += values[j].DoubleChance
      status[0].ExtraPvEDamage += values[j].ExtraPvEDamage
      status[0].IgnoreDamageResistance += values[j].IgnoreDamageResistance
      status[0].ExtraPvPDamage += values[j].ExtraPvPDamage
      status[0].IgnoreExtraReductionToStunned += values[j].IgnoreExtraReductionToStunned
      status[0].MaxHP += values[j].MaxHP
      status[0].PvPWeaponDefense += values[j].PvPWeaponDefense
      status[0].CriticalHitResistance += values[j].CriticalHitResistance
      status[0].PvPSkillDefense += values[j].PvPSkillDefense
      status[0].WeaponBlock += values[j].WeaponBlock
      status[0].DamageReduction += values[j].DamageReduction
      status[0].Defense += values[j].Defense
      status[0].ExtraDamageOnCriticalHit += values[j].ExtraDamageOnCriticalHit
      status[0].SkillDamageBoost += values[j].SkillDamageBoost
      status[0].WeaponDamageBoost += values[j].WeaponDamageBoost
      status[0].AllTypeBoost += values[j].AllTypeBoost
      status[0].BlockPenetration += values[j].BlockPenetration
      status[0].PvPDamageResistance += values[j].PvPDamageResistance
      status[0].PotionRecoveryRate += values[j].PotionRecoveryRate
      status[0].HealBoost += values[j].HealBoost
      status[0].DoubleResistance += values[j].DoubleResistance
      status[0].DamageResistance += values[j].DamageResistance
      status[0].CCAccuracy += values[j].CCAccuracy
      status[0].PvEAccuracy += values[j].PvEAccuracy
      status[0].ExtraAccuracyToStunned += values[j].ExtraAccuracyToStunned
      status[0].PvPAccuracy += values[j].PvPAccuracy
      status[0].SkillAccuracy += values[j].SkillAccuracy
      status[0].AbsoluteAccuracy += values[j].AbsoluteAccuracy
      status[0].StunAccuracy += values[j].StunAccuracy
      status[0].HoldAccuracy += values[j].HoldAccuracy
      status[0].SkillResistance += values[j].SkillResistance
      status[0].CCDurationReduction += values[j].CCDurationReduction
      status[0].HoldResistance += values[j].HoldResistance
      status[0].WeaponDefense += values[j].WeaponDefense
      status[0].SkillDefense += values[j].SkillDefense
      status[0].StunResistance += values[j].StunResistance
      status[0].AggressionResistance += values[j].AggressionResistance
      status[0].SilenceResistance += values[j].SilenceResistance
      status[0].CCStackResistance += values[j].CCStackResistance
      status[0].BlessingsRechargeIncrease += values[j].BlessingsRechargeIncrease
      status[0].BasicAttackDamage += values[j].BasicAttackDamage
      status[0].BasicAttackCriticalHit += values[j].BasicAttackCriticalHit
      status[0].BasicAttackDamageResistance += values[j].BasicAttackDamageResistance
      status[0].BasicAttackDamageReduction += values[j].BasicAttackDamageReduction
      status[0].BasicAttackCriticalHitResistance += values[j].BasicAttackCriticalHitResistance
      status[0].BlessingsConservation += values[j].BlessingsConservation
      status[0].BasicAttackDamageBoost += values[j].BasicAttackDamageBoost
      status[0].BonusEXP += values[j].BonusEXP
    }
  }

  document.getElementById('point')!.textContent = status[0].Point.toString();

  // ステータス更新
  if (status[0].CriticalHit > 0) addRow('クリティカル', status[0].CriticalHit.toString(), '%');
  if (status[0].AllDamage > 0) addRow('すべてのダメージ', status[0].AllDamage.toString());
  if (status[0].Accuracy > 0) addRow('命中', status[0].Accuracy.toString());
  if (status[0].DoubleChance > 0) addRow('ダブル確率', status[0].DoubleChance.toString(), '%');
  if (status[0].ExtraPvEDamage > 0) addRow('PvE追加ダメージ', status[0].ExtraPvEDamage.toString());
  if (status[0].IgnoreDamageResistance > 0) addRow('ダメージ耐性無視', status[0].IgnoreDamageResistance.toString(), '%');
  if (status[0].ExtraPvPDamage > 0) addRow('PvP追加ダメージ', status[0].ExtraPvPDamage.toString());
  if (status[0].IgnoreExtraReductionToStunned > 0) addRow('スタン対象追加リダクション無視', status[0].IgnoreExtraReductionToStunned.toString());
  if (status[0].MaxHP > 0) addRow('最大HP', status[0].MaxHP.toString());
  if (status[0].PvPWeaponDefense > 0) addRow('PvP武器ダメージ耐性', status[0].PvPWeaponDefense.toString(), '%');
  if (status[0].CriticalHitResistance > 0) addRow('クリティカル抵抗', status[0].CriticalHitResistance.toString(), '%');
  if (status[0].PvPSkillDefense > 0) addRow('PvPスキルダメージ耐性', status[0].PvPSkillDefense.toString(), '%');
  if (status[0].WeaponBlock > 0) addRow('武器防御', status[0].WeaponBlock.toString(), '%');
  if (status[0].DamageReduction > 0) addRow('ダメージリダクション', status[0].DamageReduction.toString());
  if (status[0].Defense > 0) addRow('防御力', status[0].Defense.toString());
  if (status[0].ExtraDamageOnCriticalHit > 0) addRow('クリティカル時の追加ダメージ', status[0].ExtraDamageOnCriticalHit.toString());
  if (status[0].SkillDamageBoost > 0) addRow('スキルダメージ増幅', status[0].SkillDamageBoost.toString(), '%');
  if (status[0].WeaponDamageBoost > 0) addRow('武器ダメージ増幅', status[0].WeaponDamageBoost.toString(), '%');
  if (status[0].AllTypeBoost > 0) addRow('すべての属性増幅', status[0].AllTypeBoost.toString(), '%');
  if (status[0].BlockPenetration > 0) addRow('防御貫通', status[0].BlockPenetration.toString(), '%');
  if (status[0].PvPDamageResistance > 0) addRow('PvPダメージ耐性', status[0].PvPDamageResistance.toString(), '%');
  if (status[0].PotionRecoveryRate > 0) addRow('ポーション回復率', status[0].PotionRecoveryRate.toString(), '%');
  if (status[0].HealBoost > 0) addRow('ヒール増幅', status[0].HealBoost.toString(), '%');
  if (status[0].DoubleResistance > 0) addRow('ダブル抵抗', status[0].DoubleResistance.toString(), '%');
  if (status[0].DamageResistance > 0) addRow('ダメージ耐性', status[0].DamageResistance.toString(), '%');
  if (status[0].CCAccuracy > 0) addRow('状態異常命中', status[0].CCAccuracy.toString(), '%');
  if (status[0].PvEAccuracy > 0) addRow('PvE命中', status[0].PvEAccuracy.toString());
  if (status[0].ExtraAccuracyToStunned > 0) addRow('スタン対象追加命中', status[0].ExtraAccuracyToStunned.toString());
  if (status[0].PvPAccuracy > 0) addRow('PvP命中', status[0].PvPAccuracy.toString());
  if (status[0].SkillAccuracy > 0) addRow('スキル命中', status[0].SkillAccuracy.toString());
  if (status[0].AbsoluteAccuracy > 0) addRow('絶対命中率', status[0].AbsoluteAccuracy.toString(), '%');
  if (status[0].StunAccuracy > 0) addRow('スタン命中', status[0].StunAccuracy.toString(), '%');
  if (status[0].HoldAccuracy > 0) addRow('ホールド命中', status[0].HoldAccuracy.toString(), '%');
  if (status[0].SkillResistance > 0) addRow('スキル抵抗', status[0].SkillResistance.toString());
  if (status[0].CCDurationReduction > 0) addRow('状態異常時間減少', status[0].CCDurationReduction.toString(), '%');
  if (status[0].HoldResistance > 0) addRow('ホールド耐性', status[0].HoldResistance.toString(), '%');
  if (status[0].WeaponDefense > 0) addRow('武器ダメージ耐性', status[0].WeaponDefense.toString(), '%');
  if (status[0].SkillDefense > 0) addRow('スキルダメージ耐性', status[0].SkillDefense.toString(), '%');
  if (status[0].StunResistance > 0) addRow('スタン耐性', status[0].StunResistance.toString(), '%');
  if (status[0].AggressionResistance > 0) addRow('ヘイト耐性', status[0].AggressionResistance.toString(), '%');
  if (status[0].SilenceResistance > 0) addRow('沈黙耐性', status[0].SilenceResistance.toString(), '%');
  if (status[0].CCStackResistance > 0) addRow('重複状態異常耐性', status[0].CCStackResistance.toString(), '%');
  if (status[0].BlessingsRechargeIncrease > 0) addRow('祝福増加量増加', status[0].BlessingsRechargeIncrease.toString(), '%');
  if (status[0].BasicAttackDamage > 0) addRow('通常攻撃ダメージ', status[0].BasicAttackDamage.toString());
  if (status[0].BasicAttackCriticalHit > 0) addRow('通常攻撃クリティカル', status[0].BasicAttackCriticalHit.toString(), '%');
  if (status[0].BasicAttackDamageResistance > 0) addRow('通常攻撃ダメージ耐性', status[0].BasicAttackDamageResistance.toString(), '%');
  if (status[0].BasicAttackDamageReduction > 0) addRow('通常攻撃ダメージリダクション', status[0].BasicAttackDamageReduction.toString());
  if (status[0].BasicAttackCriticalHitResistance > 0) addRow('通常攻撃クリティカル抵抗', status[0].BasicAttackCriticalHitResistance.toString(), '%');
  if (status[0].BlessingsConservation > 0) addRow('祝福消耗量減少', status[0].BlessingsConservation.toString(), '%');
  if (status[0].BasicAttackDamageBoost > 0) addRow('通常攻撃ダメージ増幅', status[0].BasicAttackDamageBoost.toString(), '%');
  if (status[0].BonusEXP > 0) addRow('EXPボーナス', status[0].BonusEXP.toString(), '%');
}

function addRow(itemName: string, value: string, unit: string = '') {
  const table: HTMLTableElement = <HTMLTableElement>document.querySelector('#status-view > table');
  const row: HTMLTableRowElement = table.insertRow(-1);
  const cell1: HTMLTableCellElement = row.insertCell(-1);
  const cell2: HTMLTableCellElement = row.insertCell(-1);
  cell1.innerHTML = itemName;
  cell2.innerHTML = `+${value}${unit}`;
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