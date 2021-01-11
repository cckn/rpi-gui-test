import Chart from "chart.js";

export default class SmoothChartComponent {
  samples = 100;
  speed = 100;
  values: number[] = [];
  labels: number[] = [];
  chart;
  value = 0;

  constructor() {
    this.values.length = this.samples;
    this.labels.length = this.samples;
    this.values.fill(0);
    this.labels.fill(0);
    const target = document.querySelector(".chart");
    this.chart = new Chart(target as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.values,
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            lineTension: 0.25,
            pointRadius: 0,
          },
          {
            data: this.values,
            backgroundColor: "rgba(55, 99, 132, 0.1)",
            borderColor: "rgb(55, 99, 132)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: this.speed * 1,
          easing: "linear",
        },
        // legend: false,
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
                max: 60,
                min: 0,
              },
            },
          ],
        },
      },
    });
  }

  advance() {
    //value = Math.min(Math.max(value + (0.1 - Math.random() / 5), -1), 1);
    var d = new Date();

    this.labels.push(d.getSeconds());
    this.labels.shift();
    //values.push(value);

    this.values.push(d.getSeconds());

    this.values.shift();

    this.chart.update();
  }
  update() {
    requestAnimationFrame(this.advance);
  }
}
