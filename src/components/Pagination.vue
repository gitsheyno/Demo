<script setup lang="ts">
/**
 * PaginationControls
 *
 * Controlled pagination component responsible for page navigation.
 *
 * - Renders previous / next controls
 * - Displays a limited range of page numbers
 * - Emits navigation events without managing state internally
 *
 * Accessibility:
 * - Uses semantic navigation landmarks
 * - Buttons are keyboard accessible
 *
 * This component is stateless and controlled by the parent.
 */
import { computed } from "vue";
import Button from "./Button.vue";

const props = defineProps<{
  page: number;
  totalPages: number;
  pageNumbers: number[];
  canPrev: boolean;
  canNext: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "prev"): void;
  (e: "next"): void;
  (e: "goTo", page: number): void;
}>();

const goToPage = (p: number) => emit("goTo", p);

const getLastPageNumber = computed(() => {
  return props.pageNumbers[props.pageNumbers.length - 1] || 1;
});
const getFirstPageNumber = computed(() => {
  return props.pageNumbers[0] || 1;
});
</script>

<template>
  <nav class="flex items-center gap-3" aria-label="Pagination controls">
    <Button
      variant="secondary"
      type="button"
      :disabled="!canPrev || loading"
      @click="emit('prev')"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Previous
    </Button>

    <div class="hidden sm:flex items-center gap-1">
      <Button
        v-if="getFirstPageNumber > 1"
        type="button"
        class="w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
        @click="goToPage(1)"
      >
        1
      </Button>

      <span v-if="getFirstPageNumber > 2" class="px-1 text-gray-400">…</span>

      <Button
        v-for="p in pageNumbers"
        :key="p"
        :variant="p === page ? 'primary' : 'secondary'"
        size="sm"
        :disabled="loading"
        class="w-10 h-10 p-0"
        @click="goToPage(p)"
      >
        {{ p }}
      </Button>

      <span v-if="getLastPageNumber < totalPages - 1" class="px-1 text-gray-400"
        >…</span
      >

      <Button
        v-if="getLastPageNumber < totalPages"
        type="button"
        class="w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </Button>
    </div>

    <Button
      variant="secondary"
      type="button"
      :disabled="!canNext || loading"
      @click="emit('next')"
    >
      Next
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Button>
  </nav>
</template>
