import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, watch } from "vue";
import { fn } from "storybook/test";
import SearchInput from "../components/SearchInput.vue";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  args: {
    modelValue: "",
    "onUpdate:modelValue": fn(),
  },
  parameters: {
    actions: {
      handles: ["focusin", "focusout"],
    },
  },
  argTypes: {
    modelValue: { control: "text" },
  },

  render: (args) => ({
    components: { SearchInput },
    setup() {
      const value = ref(String(args.modelValue ?? ""));

      watch(
        () => args.modelValue,
        (v) => (value.value = String(v ?? ""))
      );

      const onUpdate = (v: string) => {
        value.value = v;
        args["onUpdate:modelValue"]?.(v);
      };

      return {
        value,
        onUpdate,
      };
    },
    template: `
      <div
        style="max-width:700px;padding:24px;"
        @focusin="onCaptureFocusIn"
        @focusout="onCaptureFocusOut"
      >
        <!-- capture click to log clear button clicks specifically -->
        <div @click.capture="onClearButtonClickCapture">
          <SearchInput :modelValue="value" @update:modelValue="onUpdate" />
        </div>

        <p style="margin-top:12px;">
          Current value: <strong>{{ value }}</strong>
        </p>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { modelValue: "" },
};

export const WithInitialValue: Story = {
  args: { modelValue: "Initial Search Text" },
};

export const LongValue: Story = {
  args: {
    modelValue:
      "This is a longer search query to test layout and clear button behavior",
  },
};
