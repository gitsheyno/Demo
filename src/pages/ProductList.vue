<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import ProductCard from "../components/ProductCard.vue";
import SearchHeader from "../components/SearchHeader.vue";
import Skleton from "../components/Skleton.vue";
import PaginationControls from "../components/Pagination.vue";
import type { Product, ProductsSearchResponse } from "../utilities/types";

const MAX_BUTTONS = 5;
const DEFAULT_DELAY = 400;
const DEFAULT_LIMIT = 10;

const query = ref("");
const dataa = ref<Product[]>([]);
const total = ref(0);

const loading = ref(false);
const error = ref<string | null>(null);

const limit = ref(DEFAULT_LIMIT);
const page = ref(1);

let debounceTimer: number | null;

const skip = computed(() => (page.value - 1) * limit.value);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(total.value / limit.value))
);

const fromItem = computed(() => {
  if (total.value === 0) return 0;
  return skip.value + 1;
});

const toItem = computed(() => {
  return Math.min(skip.value + dataa.value.length, total.value);
});

const canPrev = computed(() => page.value > 1);
const canNext = computed(() => page.value < totalPages.value);

const pageNumbers = computed(() => {
  const half = Math.floor(MAX_BUTTONS / 2);

  let start = Math.max(1, page.value - half);
  const end = Math.min(totalPages.value, start + MAX_BUTTONS - 1);

  start = Math.max(1, end - MAX_BUTTONS + 1);

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
});

const fetData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const params = new URLSearchParams({
      q: query.value,
      limit: String(limit.value),
      skip: String(skip.value),
    });

    const result = await fetch(
      `https://dummyjson.com/products/search?${params.toString()}`
    );

    if (!result.ok) throw new Error(`Request failed (${result.status})`);

    const data = (await result.json()) as ProductsSearchResponse;

    dataa.value = data.products ?? [];
    total.value = data.total ?? 0;

    if (page.value > totalPages.value) page.value = totalPages.value;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Unexpected error";
    dataa.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

const handleQuery = (value: string) => {
  query.value = value;
  page.value = 1;
};

function goToPage(p: number) {
  const next = Math.min(Math.max(1, p), totalPages.value);
  if (next === page.value) return;
  page.value = next;
  void fetData();
}

function nextPage() {
  if (!canNext.value) return;
  page.value += 1;
  void fetData();
}

function prevPage() {
  if (!canPrev.value) return;
  page.value -= 1;
  void fetData();
}

function debounceFetch(timer = DEFAULT_DELAY) {
  if (debounceTimer) {
    window.clearTimeout(debounceTimer);
  }

  debounceTimer = window.setTimeout(() => {
    void fetData();
  }, timer);
}

watch([query], () => {
  debounceFetch();
});

onMounted(() => {
  fetData();
});
</script>
<template>
  <main
    class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200"
  >
    <SearchHeader :query="query" @update:query="handleQuery" />

    <div
      class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col flex-1"
    >
      <section class="flex flex-col flex-1" aria-label="Product results">
        <div
          v-if="error"
          class="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"
        >
          {{ error }}
        </div>

        <div
          v-else-if="loading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Loading"
        >
          <Skleton v-for="n in 6" :key="n" />
        </div>

        <div
          v-else-if="dataa.length === 0"
          class="flex flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <div class="text-center px-6 py-10">
            <p class="text-lg font-semibold text-gray-900">No data</p>
            <p class="mt-2 text-sm text-gray-600">
              Try a different search term.
            </p>
          </div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Product grid"
        >
          <ProductCard
            v-for="product in dataa"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>

      <footer
        class="mt-10 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        aria-label="Pagination"
      >
        <div class="text-sm text-gray-600">
          <span class="font-medium text-gray-900">
            {{ fromItem }}–{{ toItem }}
          </span>
          of
          <span class="font-medium text-gray-900">{{ total }}</span>
          products
        </div>

        <PaginationControls
          :page="page"
          :totalPages="totalPages"
          :pageNumbers="pageNumbers"
          :canPrev="canPrev"
          :canNext="canNext"
          :loading="loading"
          @prev="prevPage"
          @next="nextPage"
          @goTo="goToPage"
        />
      </footer>
    </div>
  </main>
</template>
