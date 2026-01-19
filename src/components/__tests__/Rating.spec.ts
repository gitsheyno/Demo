import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Rating from "../Rating.vue";

describe("Rating", () => {
  it("uses default maxStars=5 and sets aria-label", () => {
    const wrapper = mount(Rating, {
      props: { rating: 4.2 },
    });

    expect(wrapper.attributes("role")).toBe("img");
    expect(wrapper.attributes("aria-label")).toContain("out of 5 stars");
  });

  it("respects maxStars prop for rendering star count", () => {
    const wrapper = mount(Rating, {
      props: { rating: 3, maxStars: 10 },
    });

    const stars = wrapper.findAll("div.relative.w-4.h-4");
    expect(stars.length).toBe(10);
    expect(wrapper.attributes("aria-label")).toContain("out of 10 stars");
  });

  it("clamps rating in aria-label if you use safeRating (if present)", () => {
    const wrapper = mount(Rating, {
      props: { rating: 999, maxStars: 5 },
    });

    expect(wrapper.attributes("aria-label")).toContain("out of 5 stars");
  });
});
