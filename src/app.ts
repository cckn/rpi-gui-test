import "./app.css";
import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const $now: HTMLLabelElement | null = document.querySelector(".time-now");
  // const $goWorkScript: HTMLLabelElement | null = document.querySelector(
  //   ".go-work-script"
  // );
  // const $goWorkBotton: HTMLButtonElement | null = document.querySelector(
  //   ".go-work-botton"
  // );
  // const $goHomeScript: HTMLLabelElement | null = document.querySelector(
  //   ".go-home-script"
  // );
  // const $goHomeBotton: HTMLButtonElement | null = document.querySelector(
  //   ".go-home-botton"
  // );
  // const $goHomeScript24: HTMLLabelElement | null = document.querySelector(
  //   ".go-home-script24"
  // );
  // const $goHomeBotton24: HTMLButtonElement | null = document.querySelector(
  //   ".go-home-botton24"
  // );

  // $goWorkBotton?.addEventListener("click", function () {});

  // $goHomeBotton?.addEventListener("click", function () {});

  // $goHomeBotton24?.addEventListener("click", function () {});

  const updata = () => {
    const now = new Date();
    ($now as HTMLHeadElement).innerHTML = `${now.toLocaleString()}`;
  };

  updata();
  setInterval(() => {
    updata();
  }, 1000);
});
