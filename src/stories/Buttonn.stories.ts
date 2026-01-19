import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";
import Button from "../components/Button.vue";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    type: { control: "select", options: ["button", "submit", "reset"] },
  },
  args: {
    variant: "secondary",
    size: "md",
    disabled: false,
    loading: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddToCart: Story = {
  args: { variant: "primary" },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Add to Cart</Button>`,
  }),
};

export const Primary: Story = {
  args: { variant: "primary" },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Primary</Button>`,
  }),
};

export const Secondary: Story = {
  args: { variant: "secondary" },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Secondary</Button>`,
  }),
};

export const Ghost: Story = {
  args: { variant: "ghost" },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Ghost</Button>`,
  }),
};

export const Loading: Story = {
  args: { variant: "primary", loading: true },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Loading</Button>`,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Disabled</Button>`,
  }),
};
