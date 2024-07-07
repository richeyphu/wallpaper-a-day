<script setup lang="ts">
const config = useRuntimeConfig();

const { data: visitsData } = await useFetch<{ value: number }>(
  `${config.public.countApiUrl}/visits`,
  {
    server: false,
  }
);

watch(visitsData, (value) => {
  console.log({ ...value });
});

useHead({
  titleTemplate: "%site.name",
});
</script>

<template>
  <Hero />
</template>
