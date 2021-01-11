import "./css/app.css";
import ChartComponent from "./components/ChartComponent";
import api from "./api";
import ButtonComponent from "./components/ButtonComponent";

const $now: HTMLSpanElement | null = document.querySelector(".now");

const $randomSpan: HTMLSpanElement | null = document.querySelector(
  ".random-span"
);
const $controlSpan: HTMLSpanElement | null = document.querySelector(
  ".control-span"
);
const $grid__status = document.querySelector(".grid__status");
const $grid__control = document.querySelector(".grid__control");

const updataState = (state: "on" | "off") => {
  if ($controlSpan) $controlSpan.innerText = state;

  if (state === "on") {
    $grid__status?.classList.replace("status--off", "status--on");
  } else {
    $grid__status?.classList.replace("status--on", "status--off");
  }
};
const controlState = async (state: "on" | "off") => {
  const { data } = await api.putState(state);
  updataState(data);
};

if ($grid__control) {
  new ButtonComponent($grid__control, "on", {
    onClick: (e) => controlState("on"),
    classNames: "button is-success button-on",
  });
  new ButtonComponent($grid__control, "off", {
    onClick: (e) => controlState("off"),
    classNames: "button is-danger button-off",
  });
}
const interval = 100;
const $chart: HTMLCanvasElement | null = document.querySelector(".chart");
const chart = new ChartComponent($chart as HTMLCanvasElement, 100, interval);

const update = async () => {
  const now = new Date();

  const { data: random } = await api.getValue();
  const { data: state } = await api.getState();

  if ($now) $now.innerHTML = `${now.toLocaleTimeString()}`;
  if ($randomSpan) $randomSpan.innerText = random.toFixed(2);

  updataState(state);

  chart.addValue(now.getSeconds().toString(), random);
  // chart.update();
  let prevN = 0;
  setTimeout(() => {
    requestAnimationFrame(update);
  }, interval);
};

update();
requestAnimationFrame(update);
