<script setup lang="ts">
const props = defineProps<{
  label: string;
  prefix?: string;
}>();
</script>

<template>
  <span class="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
    {{ prefix ?? "#" }}{{ label }}
  </span>
</template>
