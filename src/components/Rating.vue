<script setup lang="ts">
/**
 * Rating
 *
 * Displays a star-based rating with support for partial values.
 *
 * - Safely clamps rating values within allowed range
 * - Supports configurable maximum star count
 *
 * Accessibility:
 * - Exposes a descriptive aria-label for screen readers
 */
import { computed } from "vue";

interface Props {
  rating: number;
  maxStars?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxStars: 5,
});

const safeRating = computed(() => {
  if (props.rating < 0) return 0;
  if (props.rating > props.maxStars) return props.maxStars;
  return props.rating;
});
</script>

<template>
  <div
    class="flex"
    :aria-label="`Rated ${safeRating.toFixed(1)} out of ${maxStars} stars`"
    role="img"
  >
    <div v-for="i in maxStars" :key="i" class="relative w-4 h-4">
      <svg
        aria-hidden="true"
        class="absolute inset-0 text-slate-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>

      <svg
        aria-hidden="true"
        class="absolute inset-0 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        :style="{
          clipPath: `inset(0 ${Math.max(
            0,
            100 - Math.max(0, Math.min(1, safeRating - (i - 1))) * 100
          )}% 0 0)`,
        }"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    </div>
  </div>
</template>
