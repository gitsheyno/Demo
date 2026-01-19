import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Badge from "../Badge.vue";
describe("Badge", () => {
  it("renders slot content", () => {
    const wrapper = mount(Badge, {
      props: { type: "discount" },
      slots: { default: "-10%" },
    });

    expect(wrapper.text()).toContain("-10%");
  });

  it("applies default size (sm) when not provided", () => {
    const wrapper = mount(Badge, {
      props: { type: "limited" },
      slots: { default: "Only 3 left" },
    });

    expect(wrapper.classes()).toContain("text-xs");
    expect(wrapper.classes()).toContain("px-2.5");
    expect(wrapper.classes()).toContain("py-1");
  });

  it("applies lg size classes when size=lg", () => {
    const wrapper = mount(Badge, {
      props: { type: "out", size: "lg" },
      slots: { default: "Out of stock" },
    });

    expect(wrapper.classes()).toContain("text-sm");
    expect(wrapper.classes()).toContain("px-4");
    expect(wrapper.classes()).toContain("py-2");
  });

  it("applies type styles based on type", () => {
    const wrapper = mount(Badge, {
      props: { type: "discount" },
      slots: { default: "Discount" },
    });

    expect(wrapper.classes()).toContain("bg-red-600");
    expect(wrapper.classes()).toContain("text-white");
  });
});
