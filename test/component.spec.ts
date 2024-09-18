import { describe, it, expect } from "vitest";
import "../src/component";

describe("MyComponent", () => {
  it("should initialize correctly", () => {
    const element = document.createElement("my-component");
    element.setAttribute("data-first-name", "John");
    element.setAttribute("data-last-name", "Doe");
    expect(element.shadowRoot?.textContent?.trim()).toBe("Hello John Doe!");
  });

  it("should react to changes", () => {
    const element = document.createElement("my-component");
    element.setAttribute("data-first-name", "John");
    element.setAttribute("data-last-name", "Doe");
    expect(element.shadowRoot?.textContent?.trim()).toBe("Hello John Doe!");

    element.setAttribute("data-first-name", "Jane");
    element.setAttribute("data-last-name", "Smith");
    expect(element.shadowRoot?.textContent?.trim()).toBe("Hello Jane Smith!");
  });
});
