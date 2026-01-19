import type { Meta, StoryObj } from "@storybook/vue3";
import { computed, ref } from "vue";
import Pagination from "../components/Pagination.vue";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Helper to create a stateful pagination wrapper
 */
const createPaginationStory = (initialPage: number, total: number) => ({
  components: { Pagination },
  setup() {
    const page = ref(initialPage);
    const totalPages = ref(total);
    const loading = ref(false);

    const canPrev = computed(() => page.value > 1);
    const canNext = computed(() => page.value < totalPages.value);

    const pageNumbers = computed(() => {
      const MAX_BUTTONS = 5;
      const half = Math.floor(MAX_BUTTONS / 2);

      let start = Math.max(1, page.value - half);
      const end = Math.min(totalPages.value, start + MAX_BUTTONS - 1);
      start = Math.max(1, end - MAX_BUTTONS + 1);

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    const onPrev = () => {
      page.value = Math.max(1, page.value - 1);
    };

    const onNext = () => {
      page.value = Math.min(totalPages.value, page.value + 1);
    };

    const onGoTo = (p: number) => {
      page.value = Math.min(Math.max(1, p), totalPages.value);
    };

    return {
      page,
      totalPages,
      pageNumbers,
      canPrev,
      canNext,
      loading,
      onPrev,
      onNext,
      onGoTo,
    };
  },
  template: `
    <div style="padding:24px; background:#f8fafc;">
      <Pagination
        :page="page"
        :totalPages="totalPages"
        :pageNumbers="pageNumbers"
        :canPrev="canPrev"
        :canNext="canNext"
        :loading="loading"
        @prev="onPrev"
        @next="onNext"
        @goTo="onGoTo"
      />

      <p style="margin-top:12px; text-align:center;">
        Current page: <strong>{{ page }}</strong> / {{ totalPages }}
      </p>
    </div>
  `,
});

export const Middle: Story = {
  render: () => createPaginationStory(3, 10),
};

export const FirstPage: Story = {
  render: () => createPaginationStory(1, 10),
};

export const LastPage: Story = {
  render: () => createPaginationStory(10, 10),
};

export const LargeRange: Story = {
  render: () => createPaginationStory(12, 25),
};
