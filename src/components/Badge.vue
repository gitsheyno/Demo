<script setup lang="ts">
import { computed } from "vue";

type BadgeType = "discount" | "limited" | "out";
type BadgeSize = "sm" | "lg";

const props = withDefaults(
  defineProps<{
    type: BadgeType;
    size?: BadgeSize;
  }>(),
  {
    size: "sm",
  }
);

/**
 * Base shape
 */
const base = "inline-flex items-center font-bold rounded-md";

/**
 * Color / intent styles (by type)
 */
const typeStyles: Record<BadgeType, string> = {
  discount: "bg-red-600 text-white",
  limited: "bg-amber-100 text-amber-900",
  out: "bg-white/95 text-red-700 ring-1 ring-red-200",
};

/**
 * Size styles
 */
const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2.5 py-1",
  lg: "text-sm px-4 py-2",
};

const classes = computed(
  () => `${base} ${typeStyles[props.type]} ${sizeStyles[props.size]}`
);
</script>

<template>
  <span :class="classes" role="status">
    <slot />
  </span>
</template>
