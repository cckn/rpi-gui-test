import "./app.css";
import axios from "axios";
import Chart from "chart.js";

document.addEventListener("DOMContentLoaded", () => {
  const $now: HTMLSpanElement | null = document.querySelector(".now");

  const $randomSpan: HTMLSpanElement | null = document.querySelector(
    ".random-span"
  );
  const $controlSpan: HTMLSpanElement | null = document.querySelector(
    ".control-span"
  );
  const $onButton: HTMLButtonElement | null = document.querySelector(
    ".button-on"
  );
  const $offButton: HTMLButtonElement | null = document.querySelector(
    ".button-off"
  );

  const onOffFn = async (data: "on" | "off") => {
    return await axios.put(
      "http://localhost:3000/api/state",
      { data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  $onButton?.addEventListener("click", async (e) => {
    const { data } = await onOffFn("on");
    if ($controlSpan) $controlSpan.innerText = data;
  });

  $offButton?.addEventListener("click", async () => {
    const { data } = await onOffFn("off");
    if ($controlSpan) $controlSpan.innerText = data;
  });

  const $chart: HTMLCanvasElement | null = document.querySelector("#myChart");

  let chart: Chart;
  const data: number[] = [];
  const labels: number[] = [];
  let count = 0;
  const ctx = $chart?.getContext("2d");

  if (ctx) {
    chart = new Chart(ctx, {
      type: "line",
      data: {},
    });
  }

  const updata = async () => {
    const now = new Date();

    const { data: random } = await axios.get(
      "http://localhost:3000/api/random"
    );
    const { data: state } = await axios.get("http://localhost:3000/api/state");

    data.push(parseFloat(random));
    labels.push(count++);

    if (data.length > 100) {
      data.shift();
      labels.shift();
    }

    if ($now) $now.innerHTML = `${now.toLocaleTimeString()}`;
    if ($randomSpan) $randomSpan.innerText = random.toFixed(2);
    if ($controlSpan) $controlSpan.innerText = state;

    if ($chart && ctx) {
      if (chart) {
        chart.destroy();
      }
      if (ctx && $chart) {
        chart = new Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "테스트 데이터셋",
                data,
                borderColor: "skyblue",
                backgroundColor: "skyblue",
                fill: true,
              },
            ],
          },

          options: {
            animation: {
              duration: 0,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: Math.min(...data) - 100,
                    max: Math.max(...data) + 100,
                  },
                },
              ],
            },
          },
        });
      }
    }
  };

  updata();
  setInterval(() => {
    updata();
  }, 100);
});
