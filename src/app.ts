import "./app.css";
import axios from "axios";

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

  const updata = async () => {
    const now = new Date();
    ($now as HTMLHeadElement).innerHTML = `${now.toLocaleString()}`;

    const { data: random } = await axios.get(
      "http://localhost:3000/api/random"
    );
    const { data: state } = await axios.get("http://localhost:3000/api/state");

    if ($randomSpan) {
      $randomSpan.innerText = random;
    }
    if ($controlSpan) {
      $controlSpan.innerText = state;
    }
  };

  updata();
  setInterval(() => {
    updata();
  }, 1000);
});
