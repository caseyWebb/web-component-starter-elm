// import { Elm } from "./Component.elm";

class MyComponent extends HTMLElement {
  static observedAttributes = ["data-first-name", "data-last-name"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #elm: Elm.ElmApp | null = null;

  connectedCallback() {
    this.#elm = Elm.Main.init({
      node: this.shadowRoot as unknown as HTMLElement,
      flags: this.#getFlags(),
    });
  }

  attributeChangedCallback() {
    if (!this.#elm) {
      console.warn("Elm not initialized!");
      return;
    }
    this.#elm.ports.interopToElm.send({
      msg: "flagsUpdated",
      ...this.#getFlags(),
    });
  }

  #getFlags(): Elm.Flags {
    return {
      firstName: this.getAttribute("data-first-name") || "",
      lastName: this.getAttribute("data-last-name") || "",
    };
  }
}

customElements.define("my-component", MyComponent);
