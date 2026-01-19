import type { Meta, StoryObj } from "@storybook/vue3";
import Badge from "../components/Badge.vue";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    type: "discount",
    size: "sm",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const DiscountSmall: Story = {
  args: {
    type: "discount",
    size: "sm",
    default: "-10%",
  },
};

export const OutofStock: Story = {
  args: {
    type: "out",
    size: "lg",
    default: "Out of Stock",
  },
};

export const LimitedStock: Story = {
  args: {
    type: "limited",
    size: "sm",
    default: "only 3 left",
  },
};
