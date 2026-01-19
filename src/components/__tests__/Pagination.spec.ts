import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Pagination from "../Pagination.vue";

describe("Pagination", () => {
  const mountPagination = (
    overrides?: Partial<{
      page: number;
      totalPages: number;
      pageNumbers: number[];
      canPrev: boolean;
      canNext: boolean;
      loading: boolean;
    }>
  ) => {
    return mount(Pagination, {
      props: {
        page: 3,
        totalPages: 10,
        pageNumbers: [1, 2, 3, 4, 5],
        canPrev: true,
        canNext: true,
        loading: false,
        ...overrides,
      },
    });
  };

  it("emits prev when Previous button is clicked", async () => {
    const wrapper = mountPagination();

    const buttons = wrapper.findAll("button");
    if (buttons[0]) {
      await buttons[0].trigger("click");
    }

    expect(wrapper.emitted("prev")).toBeTruthy();
    expect(wrapper.emitted("prev")?.length).toBe(1);
  });

  it("emits next when Next button is clicked", async () => {
    const wrapper = mountPagination();

    const buttons = wrapper.findAll("button");

    const nextButton = buttons[buttons.length - 1];
    if (nextButton) {
      await nextButton.trigger("click");
    }

    expect(wrapper.emitted("next")).toBeTruthy();
    expect(wrapper.emitted("next")?.length).toBe(1);
  });

  it("emits goTo with the clicked page number", async () => {
    const wrapper = mountPagination({
      pageNumbers: [2, 3, 4],
      page: 3,
    });

    const pageButton = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "4");

    expect(pageButton).toBeTruthy();

    await pageButton!.trigger("click");

    expect(wrapper.emitted("goTo")).toBeTruthy();
    expect(wrapper.emitted("goTo")?.[0]).toEqual([4]);
  });

  it("disables Previous when canPrev=false", () => {
    const wrapper = mountPagination({ canPrev: false });

    const buttons = wrapper.findAll("button");
    const prev = buttons[0];
    expect(prev?.attributes("disabled")).toBeDefined();
  });

  it("disables Next when canNext=false", () => {
    const wrapper = mountPagination({ canNext: false });

    const buttons = wrapper.findAll("button");
    const next = buttons[buttons.length - 1];
    expect(next?.attributes("disabled")).toBeDefined();
  });

  it("disables navigation buttons when loading=true", () => {
    const wrapper = mountPagination({ loading: true });

    const buttons = wrapper.findAll("button");

    expect(buttons[0]?.attributes("disabled")).toBeDefined();
    expect(buttons[buttons.length - 1]?.attributes("disabled")).toBeDefined();
  });

  it("renders ellipsis when first page in range is > 2", () => {
    const wrapper = mountPagination({
      pageNumbers: [4, 5, 6, 7, 8],
      page: 6,
      totalPages: 10,
    });

    expect(wrapper.text()).toContain("…");
  });
});
