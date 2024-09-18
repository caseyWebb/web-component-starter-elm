class MyComponent extends HTMLElement {
  static observedAttributes = ["data-first-name", "data-last-name"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    const firstName = this.getAttribute("data-first-name") || "";
    const lastName = this.getAttribute("data-last-name") || "";

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
          <p>Hello ${firstName} ${lastName}!</p>
        `;
    }
  }
}

customElements.define("my-component", MyComponent);
