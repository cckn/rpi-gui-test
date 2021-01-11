export default class ButtonComponent {
  constructor(
    parentEl: Element,
    innerText: string,
    options: {
      classNames: string[] | string;
      onClick?: (this: HTMLButtonElement, ev: MouseEvent) => any;
    }
  ) {
    const { classNames, onClick } = options;

    const button = document.createElement("button");

    button.innerText = innerText;

    if (classNames) {
      button.className =
        typeof classNames === "string" ? classNames : classNames.join(" ");
    }

    if (onClick) button.addEventListener("click", onClick);

    parentEl.appendChild(button);
  }
}
