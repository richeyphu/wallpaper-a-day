<script setup lang="ts">
const title = WEBSITE_TITLE;
const description = "Favorite daily anime wallpaper site reimagined.";
const url = "https://wallpaper-a-day.vercel.app";

useHead({
  title: title,
  meta: [
    {
      name: "description",
      content: description,
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});

useSeoMeta({
  ogTitle: title,
  ogDescription: description,
  // ogImage: "[og:image]",
  ogUrl: url,
  twitterTitle: title,
  twitterDescription: description,
  // twitterImage: "[twitter:image]",
  twitterCard: "summary",
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
