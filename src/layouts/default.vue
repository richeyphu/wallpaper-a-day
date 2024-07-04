<script setup lang="ts">
useHead({
  title: "Wallpaper A Day",
  meta: [
    {
      name: "description",
      content: "Favorite daily anime wallpaper site reimagined.",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <div id="app" class="[&>*]:transition-colors [&>*]:duration-300">
    <Navbar />
    <slot />
  </div>
</template>

<style scoped>
#app {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
