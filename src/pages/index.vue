<script setup lang="ts">
useHead({
  title: "wallpaper a day",
});

const { data: visitsData } = await useFetch<{ value: number }>(
  `${COUNTAPI_URL}/visits`,
  {
    server: false,
  }
);

watch(visitsData, (value) => {
  console.log(value?.value);
});
</script>

<template>
  <Hero />
</template>
