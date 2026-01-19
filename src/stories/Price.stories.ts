// Price.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3";
import Price from "../components/Price.vue";

const meta: Meta<typeof Price> = {
  title: "Components/Price",
  component: Price,
  tags: ["autodocs"],
  argTypes: {
    currency: { control: "text" },
    locale: { control: "text" },
    price: { control: "number" },
    discountedPrice: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Price>;

export const NoDiscount: Story = {
  args: {
    price: 9.99,
    discountedPrice: null,
    currency: "USD",
    locale: "en-US",
  },
};

export const WithDiscount: Story = {
  args: {
    price: 9.99,
    discountedPrice: 7.99,
    currency: "USD",
    locale: "en-US",
  },
};
