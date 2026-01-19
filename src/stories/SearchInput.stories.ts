import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { fn } from "storybook/test";
import SearchInput from "../components/SearchInput.vue";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "text" },
  },
  args: {
    modelValue: "",
    "onUpdate:modelValue": fn(),
  },
  render: (args) => ({
    components: { SearchInput },
    setup() {
      const value = ref(String(args.modelValue ?? ""));

      const onUpdate = (v: string) => {
        value.value = v;
        args["onUpdate:modelValue"]?.(v);
      };

      return { args, value, onUpdate };
    },
    template: `
      <div style="max-width:700px;padding:24px;">
        <SearchInput :modelValue="value" @update:modelValue="onUpdate" />
        <p style="margin-top:12px;">
          Current value: <strong>{{ value }}</strong>
        </p>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithInitialValue: Story = {
  args: { modelValue: "Initial Search Text" },
};

export const LongValue: Story = {
  args: {
    modelValue:
      "This is a longer search query to test layout and clear button behavior",
  },
};
