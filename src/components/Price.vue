<script setup lang="ts">
/**
 * Price
 *
 * Displays product pricing with optional discount handling.
 *
 * - Shows discounted price alongside the original price when applicable
 * - Falls back to a single price when no valid discount exists
 * - Formats values using Intl.NumberFormat
 *
 * Accessibility:
 * - Includes screen-reader-only text to announce discount changes
 */
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    price: number;
    discountedPrice?: number | null;
    currency?: string;
    locale?: string;
  }>(),
  {
    discountedPrice: null,
    currency: "USD",
    locale: "en-US",
  }
);

const hasDiscount = computed(() => {
  return (
    typeof props.discountedPrice === "number" &&
    Number.isFinite(props.discountedPrice) &&
    props.discountedPrice > 0 &&
    props.discountedPrice < props.price
  );
});

const formatPrice = (value: number) =>
  new Intl.NumberFormat(props.locale, {
    style: "currency",
    currency: props.currency,
    minimumFractionDigits: 2,
  }).format(value);
</script>

<template>
  <div class="flex items-baseline gap-2">
    <template v-if="hasDiscount">
      <span class="text-xl font-bold text-slate-900">
        {{ formatPrice(discountedPrice as number) }}
      </span>
      <span class="text-sm text-slate-500 line-through" aria-hidden="true">
        {{ formatPrice(price) }}
      </span>
      <span class="sr-only">
        Discounted from {{ formatPrice(price) }} to
        {{ formatPrice(discountedPrice as number) }}.
      </span>
    </template>

    <span v-else class="text-xl font-bold text-slate-900">
      {{ formatPrice(price) }}
    </span>
  </div>
</template>
