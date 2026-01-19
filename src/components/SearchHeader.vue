<template>
  <div
    class="sticky top-0 z-50 transition-all duration-300"
    :class="
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    "
  >
    <div class="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <SearchInput :modelValue="query" @update:modelValue="handleQuery" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SearchInput from "./SearchInput.vue";

const props = defineProps<{
  query: string;
}>();

const emit = defineEmits<{
  "update:query": [value: string];
}>();

const isScrolled = ref(false);

const handleQuery = (value: string) => {
  emit("update:query", value);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
