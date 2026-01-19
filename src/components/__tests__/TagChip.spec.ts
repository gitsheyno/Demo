import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TagChip from "../TagChip.vue";
describe("TagChip", () => {
  it("renders label with default prefix (#) when prefix is undefined", () => {
    const wrapper = mount(TagChip, {
      props: { label: "beauty" },
    });

    expect(wrapper.text()).toBe("#beauty");
  });

  it("renders label with custom prefix when provided", () => {
    const wrapper = mount(TagChip, {
      props: { label: "audio", prefix: "•" },
    });

    expect(wrapper.text()).toBe("•audio");
  });
});
