import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Skleton from "../components/Skleton.vue";

const meta = {
  title: "Components/ProductCard/Skeleton",
  component: Skleton,
  tags: ["autodocs"],
  decorators: [
    () => ({
      template: `
        <div class="p-2 bg-slate-50">
          <div class="inline-block w-64">
            <story />
          </div>
        </div>
      `,
    }),
  ],
} satisfies Meta<typeof Skleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
