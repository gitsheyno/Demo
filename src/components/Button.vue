<script setup lang="ts">
/**
 * Button
 *
 * Reusable button component supporting multiple variants and sizes.
 *
 * - Variants: primary, secondary, ghost
 * - Supports loading and disabled states
 * - Prevents interaction while loading or disabled
 *
 * Accessibility:
 * - Uses native button semantics
 * - Disabled state properly reflected
 *
 */
import { computed } from "vue";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "secondary",
    size: "md",
    disabled: false,
    loading: false,
    type: "button",
  }
);

const emit = defineEmits<{
  (e: "click", ev: MouseEvent): void;
}>();

const isDisabled = computed(() => props.disabled || props.loading);

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
};

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:scale-95",
  secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
};

const classes = computed(
  () => `${base} ${sizeStyles[props.size]} ${variantStyles[props.variant]}`
);

function onClick(ev: MouseEvent) {
  if (isDisabled.value) return;
  emit("click", ev);
}
</script>

<template>
  <button :type="type" :disabled="isDisabled" :class="classes" @click="onClick">
    <span
      v-if="loading"
      class="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
    />
    <slot />
  </button>
</template>
