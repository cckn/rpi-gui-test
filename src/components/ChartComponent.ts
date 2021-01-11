import Chart, { ChartData, ChartOptions } from "chart.js";

export default class ChartComponent {
  chart: Chart;

  data: number[];
  labels: string[];

  constructor(targetEl: HTMLCanvasElement, width: number, interval: number) {
    const ctx = targetEl.getContext("2d");

    this.labels = Array.from(Array(width).keys()).map((el) => el.toString());
    this.data = Array(width).fill(null);

    const updateData: ChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          label: "테스트 데이터셋",
          backgroundColor: "rgba(255, 99, 132, 0.1)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 3,
          lineTension: 0.25,
          pointRadius: 0,
        },
      ],
    };
    const chartOptions: ChartOptions = {
      hover: { mode: "index", intersect: false, animationDuration: 0 },
      tooltips: {
        mode: "nearest",
      },
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: interval,
        easing: "linear",
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              max: 2000,
              min: 0,
            },
          },
        ],
      },
    };
    this.chart = new Chart(ctx as CanvasRenderingContext2D, {
      type: "line",
      options: chartOptions,
      data: updateData,
    });
  }

  addValue(label: string, data: number) {
    if (this.chart.data.datasets && this.chart.data.datasets[0].data) {
      this.chart.data.labels?.push(label);
      this.chart.data.labels?.shift();
      this.chart.data.datasets[0].data.push(data);
      this.chart.data.datasets[0].data.shift();

      const min = Math.min(...(this.chart.data.datasets[0].data as number[]));
      const max = Math.max(...(this.chart.data.datasets[0].data as number[]));

      if (
        this.chart.options.scales &&
        this.chart.options.scales.yAxes &&
        this.chart.options.scales.yAxes[0].ticks
      ) {
        this.chart.options.scales.yAxes[0].ticks.min = min - 100;
        this.chart.options.scales.yAxes[0].ticks.max = max + 100;
      }
    }
    this.chart.update();
  }
}
