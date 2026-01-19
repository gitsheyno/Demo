import type { Meta, StoryObj } from "@storybook/vue3";
import TagChip from "../components/TagChip.vue";

const meta: Meta<typeof TagChip> = {
  title: "Components/TagChip",
  component: TagChip,
  tags: ["autodocs"],
  args: {
    label: "Beauty",
    prefix: "#",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductTags: Story = {
  args: {
    label: "Beauty",
    prefix: "#",
  },
};

export const WithoutPrefix: Story = {
  args: {
    label: "Electronics",
    prefix: "",
  },
};
