import type { Meta, StoryObj } from "@storybook/vue3";
import ProductCard from "../components/ProductCard.vue";
import type { Product } from "../utilities/types";

const baseProduct: Product = {
  id: 1,
  title: "Wireless Headphones",
  description:
    "Comfortable over-ear headphones with strong noise isolation and long battery life.",
  category: "Audio",
  price: 199.99,
  discountPercentage: 0,
  rating: 4.2,
  stock: 20,
  tags: ["audio", "wireless", "bluetooth"],
  brand: "Acme",
  sku: "ACME-HP-001",
  warrantyInformation: "2-year warranty included.",
  shippingInformation: "Free shipping in 2–3 days",
  availabilityStatus: "In Stock",
  returnPolicy: "30-day returns",
  minimumOrderQuantity: 1,
  images: [
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  ],
  thumbnail:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  reviews: [
    {
      rating: 5,
      comment: "Great sound and very comfortable.",
      reviewerName: "Jane",
      reviewerEmail: "jane@example.com",
      date: "2025-01-10",
    },
    {
      rating: 4,
      comment: "Battery life is excellent.",
      reviewerName: "Max",
      reviewerEmail: "max@example.com",
      date: "2025-01-12",
    },
  ],
};

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  decorators: [
    () => ({
      template: `
    <div class="p-2 bg-slate-50">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <story />
        </div>
      </div>
      `,
    }),
  ],
  tags: ["autodocs"],
  args: {
    variant: "default",
    product: baseProduct,
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    product: {
      ...baseProduct,
      stock: 20,
      discountPercentage: 0,
    },
  },
};

export const DiscountAtLeast5Percent: Story = {
  args: {
    product: {
      ...baseProduct,
      stock: 20,
      discountPercentage: 15,
    },
  },
};

export const DiscountBelow5PercentHidden: Story = {
  args: {
    product: {
      ...baseProduct,
      stock: 20,
      discountPercentage: 4,
    },
  },
};

export const LimitedStock: Story = {
  args: {
    product: {
      ...baseProduct,
      stock: 3,
      discountPercentage: 0,
    },
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...baseProduct,
      stock: 0,
      discountPercentage: 20,
    },
  },
};

export const noImage: Story = {
  args: {
    product: {
      ...baseProduct,
      images: [],
      thumbnail: "",
    },
  },
};
