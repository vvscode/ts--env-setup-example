import { addForm } from "./addForm";

describe("addForm", () => {
  let el: HTMLDivElement;
  beforeEach(() => {
    el = document.createElement("div");
  });
  it("creates basic markup", () => {
    addForm(el);

    expect(el.querySelector("input")).not.toBe(null);
    expect(el.querySelectorAll("p").length).toBe(3);
  });

  it("shows button if value is not empty", () => {
    addForm(el);

    const input = el.querySelector("input");

    if (!input) {
      throw new Error("Input now found");
    }

    input.value = "123";
    input.dispatchEvent(new window.Event("keyup"));
    expect(el.querySelector("button")).not.toBe(null);
    expect((el.querySelector("button") as HTMLButtonElement).innerHTML).toEqual(
      "add"
    );

    input.value = "";
    input.dispatchEvent(new window.Event("keyup"));
    expect(el.querySelector("button")).toBe(null);
  });

  it("adds new p on click by button", () => {
    addForm(el);
    const input = el.querySelector("input") as HTMLInputElement;
    const text = `${Math.random()}`;
    input.value = text;
    input.dispatchEvent(new window.Event("keyup"));
    const button = el.querySelector("button") as HTMLButtonElement;

    button.dispatchEvent(new window.Event("click"));
    expect(input.value).toBe("");
    expect(el.querySelectorAll("p").length).toBe(4);
    expect(el.querySelectorAll("p")[3].innerHTML).toBe(text);
  });

  it("has limited number of paragraphs", () => {
    addForm(el);
    const input = el.querySelector("input") as HTMLInputElement;

    for (let i = 0; i < 5; i++) {
      const text = `${Math.random()}`;
      input.value = text;
      input.dispatchEvent(new window.Event("keyup"));
      const button = el.querySelector("button") as HTMLButtonElement;
      button.dispatchEvent(new window.Event("click"));

      if (i > 1) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(el.querySelectorAll("p").length).toBe(4);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(el.querySelectorAll("p")[3].innerHTML).toBe(text);
      }
    }
  });

  it("hides button on adding paragraph", () => {
    addForm(el);
    const input = el.querySelector("input") as HTMLInputElement;
    const text = `${Math.random()}`;
    input.value = text;
    input.dispatchEvent(new window.Event("keyup"));
    const button = el.querySelector("button") as HTMLButtonElement;

    button.dispatchEvent(new window.Event("click"));
    expect(el.querySelector("button")).toBe(null);
  });
});
