import { Elm } from "./Component.elm";

class MyComponent extends HTMLElement {
  static observedAttributes = ["data-first-name", "data-last-name"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #elm: Elm.ElmApp | null = null;

  connectedCallback() {
    const outer = document.createElement("div");
    const inner = document.createElement("div");
    outer.appendChild(inner);
    this.#elm = Elm.Component.init({ node: inner, flags: this.#getFlags() });
    this.shadowRoot?.appendChild(outer);
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
