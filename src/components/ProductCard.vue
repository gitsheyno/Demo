<script setup lang="ts">
/**
 *
 *
 * ProductCard.vue
 *
 */
import { computed } from "vue";
import Badge from "./Badge.vue";
import Price from "./Price.vue";
import TagChip from "./TagChip.vue";
import Rating from "./Rating.vue";
import Button from "./Button.vue";
import type { Product } from "../utilities/types";
import { DISCOUNT_THRESHOLD } from "../config/constants";

interface Props {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const isOutOfStock = computed(() => props.product.stock === 0);

const hasDiscount = computed(
  () => props.product.discountPercentage && props.product.discountPercentage > 0
);

const discountedPrice = computed(() => {
  if (hasDiscount.value) {
    return props.product.price * (1 - props.product.discountPercentage! / 100);
  }
  return props.product.price;
});
const hasValidDiscount = computed(() => {
  if (!props.product.discountPercentage) return false;
  return props.product.discountPercentage >= DISCOUNT_THRESHOLD;
});

const imageUrl = computed(() => {
  return props.product.thumbnail || props.product.images[0] || "";
});

const reviewCount = computed(() => props.product.reviews?.length || 0);
</script>

<template>
  <article
    v-if="variant === 'default'"
    class="product-card group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <div class="relative bg-slate-100 aspect-[4/3] sm:aspect-[3/2]">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="product.title"
        class="w-full h-full object-contain"
        :class="{ 'opacity-30 grayscale': isOutOfStock }"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-slate-200"
      >
        <svg
          class="w-full h-full text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <Badge
        v-if="
          product.discountPercentage && product.stock !== 0 && hasValidDiscount
        "
        type="discount"
        size="sm"
        class="absolute top-3 left-3"
      >
        -{{ product.discountPercentage.toFixed(0) }}% Off
      </Badge>
      <Badge
        v-if="product.stock > 0 && product.stock <= 5"
        type="limited"
        size="sm"
        class="absolute top-3 right-3"
      >
        Only {{ product.stock }} left
      </Badge>
      <Badge
        v-if="product.stock === 0"
        type="out"
        size="lg"
        class="absolute inset-0 m-auto w-fit h-fit"
      >
        Out of stock
      </Badge>
    </div>

    <div class="p-4 sm:p-5">
      <div class="mb-3">
        <span
          class="text-xs font-medium text-slate-500 uppercase tracking-wider"
        >
          {{ product.brand || product.category }}
        </span>
        <h3
          class="text-lg font-semibold text-slate-900 mt-1 line-clamp-1 group-hover:text-blue-600 transition-colors"
        >
          {{ product.title }}
        </h3>
      </div>

      <p class="text-sm text-slate-600 line-clamp-2 mb-4">
        {{ product.description }}
      </p>

      <div class="flex items-center gap-2 mb-4">
        <div class="flex items-center gap-1">
          <Rating :rating="product.rating" />
          <span class="text-sm font-medium text-slate-700" aria-hidden="true">{{
            product.rating.toFixed(1)
          }}</span>
        </div>
        <span class="text-xs text-slate-500">
          ({{ reviewCount }} reviews)
        </span>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-5">
        <TagChip
          v-for="item in [...product.tags].slice(0, 3)"
          :key="item"
          :label="item"
        />
      </div>

      <div
        class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4"
      >
        <Price
          :price="product.price"
          :discountedPrice="
            product.discountPercentage && product.stock && hasValidDiscount
              ? discountedPrice
              : null
          "
        />

        <div class="flex items-center gap-1.5 text-xs text-slate-600">
          <svg
            class="w-4 h-4 text-slate-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 17h6m-6 0a2 2 0 104 0m-4 0H7a2 2 0 01-2-2V7a2 2 0 012-2h11a2 2 0 012 2v8a2 2 0 01-2 2h-2"
            />
          </svg>
          <span>{{ product.shippingInformation }}</span>
        </div>
      </div>

      <Button variant="primary" :disabled="isOutOfStock" class="w-full">
        {{ isOutOfStock ? "Notify When Available" : "Add to Cart" }}
      </Button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
