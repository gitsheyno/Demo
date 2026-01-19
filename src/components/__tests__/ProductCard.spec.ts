import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ProductCard from "../ProductCard.vue";
import type { Product } from "../../utilities/types";

const baseProduct: Product = {
  id: 1,
  title: "Wireless Headphones",
  description: "High quality sound",
  category: "Audio",
  price: 100,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  tags: ["audio", "wireless"],
  brand: "Acme",
  sku: "SKU-1",
  warrantyInformation: "1 year warranty",
  shippingInformation: "Ships in 2 days",
  availabilityStatus: "In Stock",
  returnPolicy: "30-day return",
  minimumOrderQuantity: 1,
  images: ["https://example.com/image.jpg"],
  thumbnail: "https://example.com/thumb.jpg",
  reviews: [],
};

describe("ProductCard", () => {
  it("renders product title and description", () => {
    const wrapper = mount(ProductCard, {
      props: { product: baseProduct },
    });

    expect(wrapper.text()).toContain(baseProduct.title);
    expect(wrapper.text()).toContain(baseProduct.description);
  });

  it("shows discount badge and discounted price when discount >= 5%", () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: {
          ...baseProduct,
          discountPercentage: 10,
        },
      },
    });

    expect(wrapper.text()).toContain("%");
    expect(wrapper.findComponent({ name: "Badge" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "Price" }).exists()).toBe(true);
  });

  it("does not show discount when discount < 5%", () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: {
          ...baseProduct,
          discountPercentage: 3,
        },
      },
    });

    expect(wrapper.text()).not.toContain("%");
  });

  it("shows limited stock badge when stock <= 5", () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: {
          ...baseProduct,
          stock: 3,
        },
      },
    });

    expect(wrapper.text().toLowerCase()).toContain("only");
  });

  it("shows out of stock state and disables button", () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: {
          ...baseProduct,
          stock: 0,
        },
      },
    });

    expect(wrapper.text().toLowerCase()).toContain("out of stock");

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("renders product image when available", () => {
    const wrapper = mount(ProductCard, {
      props: { product: baseProduct },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe(baseProduct.thumbnail);
  });

  it("renders fallback UI when no image exists", () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: {
          ...baseProduct,
          images: [],
          thumbnail: "",
        },
      },
    });

    expect(wrapper.find("img").exists()).toBe(false);
  });
});
