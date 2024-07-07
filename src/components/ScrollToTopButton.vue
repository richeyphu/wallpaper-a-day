<script setup>
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
</script>

<template>
  <button
    class="btn btn-square btn-ghost"
    aria-label="Go to top"
    @click="scrollToTop"
  >
    <Icon name="fe:arrow-up" class="text-lg" />
  </button>
</template>
