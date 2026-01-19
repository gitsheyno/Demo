import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Button from "../Button.vue";

describe("Button", () => {
  it("renders slot content", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.text()).toContain("Click me");
  });

  it("is disabled when disabled prop is true", () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("emits click when clicked", async () => {
    const wrapper = mount(Button);

    await wrapper.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
