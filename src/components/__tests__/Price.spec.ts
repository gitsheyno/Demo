import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Price from "../Price.vue";
describe("Price", () => {
  it("renders only the price when no discount is provided", () => {
    const wrapper = mount(Price, {
      props: {
        price: 9.99,
        discountedPrice: null,
        currency: "USD",
        locale: "en-US",
      },
    });

    // USD in en-US => $9.99
    expect(wrapper.text()).toContain("$9.99");
    expect(wrapper.find("span.line-through").exists()).toBe(false);
  });

  it("renders discounted price + original price when discountedPrice < price", () => {
    const wrapper = mount(Price, {
      props: {
        price: 9.99,
        discountedPrice: 7.99,
        currency: "USD",
        locale: "en-US",
      },
    });

    expect(wrapper.text()).toContain("$7.99");
    expect(wrapper.text()).toContain("$9.99");
    expect(wrapper.find("span.line-through").exists()).toBe(true);
  });

  it("does not treat discountedPrice as discount if it is >= price", () => {
    const wrapper = mount(Price, {
      props: {
        price: 9.99,
        discountedPrice: 9.99,
        currency: "USD",
        locale: "en-US",
      },
    });

    expect(wrapper.find("span.line-through").exists()).toBe(false);
  });
});
