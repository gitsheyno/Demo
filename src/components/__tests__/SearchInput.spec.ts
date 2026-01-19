import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SearchInput from "../SearchInput.vue";

describe("SearchInput", () => {
  it("renders input with value", () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: "test" },
    });

    const input = wrapper.find("input");
    expect((input.element as HTMLInputElement).value).toBe("test");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(SearchInput);

    const input = wrapper.find("input");
    await input.setValue("hello");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["hello"]);
  });
});
