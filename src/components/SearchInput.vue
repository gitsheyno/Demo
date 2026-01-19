<script setup lang="ts">
/**
 * SearchInput
 *
 * A controlled input component used for product searching.
 *
 * - Emits updates via v-model
 * - Includes clear button for quick reset
 * - Provides visual focus feedback
 *
 * Accessibility:
 * - Uses a proper label (sr-only)
 * - Keyboard and screen-reader friendly
 */
import { ref } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);

const handleClear = () => {
  emit("update:modelValue", "");
};
</script>

<template>
  <div class="relative w-full max-w-2xl mx-auto">
    <div
      :class="[
        'relative flex items-center gap-3',
        'bg-white rounded-2xl',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-300 ease-out',
        'px-4 sm:px-5 md:px-6 py-3 sm:py-4',
        isFocused
          ? 'ring-2 ring-blue-500 ring-offset-2 shadow-2xl scale-[1.02]'
          : 'ring-1 ring-slate-200',
      ]"
    >
      <div class="shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :class="[
            'w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300',
            isFocused ? 'text-blue-500' : 'text-slate-400',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        aria-label="Search input"
        type="text"
        :value="props.modelValue"
        @input="
          emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)
        "
        @focus="isFocused = true"
        @blur="isFocused = false"
        placeholder="Search anything..."
        class="flex-1 w-full bg-transparent text-slate-800 placeholder-slate-400 text-base sm:text-lg font-medium outline-none transition-all duration-200"
      />

      <button
        v-if="props.modelValue"
        @click="handleClear"
        type="button"
        class="shrink-0 p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Clear search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in-from-top-2 {
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
  }
}

.animate-in {
  animation: fade-in 0.2s ease-out, slide-in-from-top-2 0.2s ease-out;
}
</style>
