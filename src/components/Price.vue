<script setup lang="ts">
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
