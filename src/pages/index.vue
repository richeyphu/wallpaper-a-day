<script setup lang="ts">
  const { data: visitsData } = await useFetch<{ value: number }>(
    `/api/counts/visits`,
    {
      server: false
    }
  )

  watch(visitsData, value => {
    console.log({ ...value })
  })

  useHead({
    titleTemplate: '%site.name'
  })
</script>

<template>
  <Hero />
</template>
