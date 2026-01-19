<template>
  <article
    class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
    aria-busy="true"
    aria-label="Loading product"
  >
    <div
      class="relative bg-slate-100 aspect-[4/3] sm:aspect-[3/2] overflow-hidden"
    >
      <div class="absolute inset-0 bg-slate-200" />

      <div class="absolute top-3 left-3 h-6 w-20 rounded-md bg-slate-300" />
      <div class="absolute top-3 right-3 h-6 w-24 rounded-md bg-slate-300" />
    </div>

    <div class="p-4 sm:p-5">
      <div class="h-3 w-24 rounded bg-slate-200" />

      <div class="mt-2 h-5 w-4/5 rounded bg-slate-200" />

      <div class="mt-4 space-y-2">
        <div class="h-4 w-full rounded bg-slate-200" />
        <div class="h-4 w-11/12 rounded bg-slate-200" />
      </div>

      <div class="mt-4 flex items-center gap-2">
        <div class="flex gap-1">
          <div class="h-4 w-4 rounded bg-slate-200" />
          <div class="h-4 w-4 rounded bg-slate-200" />
          <div class="h-4 w-4 rounded bg-slate-200" />
          <div class="h-4 w-4 rounded bg-slate-200" />
          <div class="h-4 w-4 rounded bg-slate-200" />
        </div>
        <div class="h-4 w-10 rounded bg-slate-200" />
        <div class="h-3 w-24 rounded bg-slate-200" />
      </div>

      <div class="mt-4 flex flex-wrap gap-1.5">
        <div class="h-5 w-16 rounded-full bg-slate-200" />
        <div class="h-5 w-20 rounded-full bg-slate-200" />
        <div class="h-5 w-14 rounded-full bg-slate-200" />
      </div>

      <div
        class="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-baseline gap-2">
          <div class="h-6 w-20 rounded bg-slate-200" />
          <div class="h-4 w-14 rounded bg-slate-200" />
        </div>

        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded bg-slate-200" />
          <div class="h-3 w-28 rounded bg-slate-200" />
        </div>
      </div>

      <div class="mt-4 h-10 w-full rounded-lg bg-slate-200" />
    </div>
  </article>
</template>
