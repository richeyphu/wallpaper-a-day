<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";

const route = useRoute();
const config = useRuntimeConfig();
const title = WEBSITE_TITLE;
const description = "Favorite daily anime wallpaper site reimagined.";
const baseUrl = config.public.baseUrl;
const url = baseUrl + route.fullPath;
const ogImage = `${baseUrl}/images/cover.png`;

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
  ogImage: ogImage,
  ogUrl: url,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div id="app" class="[&>*]:transition-colors [&>*]:duration-300">
    <Navbar />
    <slot />
  </div>
  <SpeedInsights />
</template>

<style scoped>
#app {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
