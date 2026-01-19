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

export const Default: Story = {
  args: {
    label: "Beauty",
    prefix: "#",
  },
};

export const withoutPrefix: Story = {
  args: {
    label: "Electronics",
    prefix: "",
  },
};
