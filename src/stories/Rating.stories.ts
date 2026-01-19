import type { Meta, StoryObj } from "@storybook/vue3";
import Rating from "../components/Rating.vue";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    rating: { control: "number", min: 0, max: 5, step: 0.5 },
    maxStars: { control: "number", min: 1, max: 10, step: 1 },
  },
  args: {
    rating: 4,
    maxStars: 5,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 4,
    maxStars: 5,
  },
};
export const HalfStar: Story = {
  args: {
    rating: 3.5,
    maxStars: 5,
  },
};
export const noRate: Story = {
  args: {
    rating: 0,
    maxStars: 5,
  },
};

export const OverMax: Story = {
  args: {
    rating: 8,
    maxStars: 5,
  },
};

export const BelowMin: Story = {
  args: {
    rating: -1,
    maxStars: 5,
  },
};
