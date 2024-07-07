<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";

const route = useRoute();
const config = useRuntimeConfig();

const title = WEBSITE_TITLE;
const description = "Favorite daily anime wallpaper site reimagined.";
const baseUrl = config.public.baseUrl;
const ogImage = `${baseUrl}/images/cover.png`;

const url = computed(() => config.public.baseUrl + route.fullPath);

useHead({
  templateParams: {
    site: {
      name: title,
      url: baseUrl,
    },
    separator: "/",
  },
  titleTemplate: "%s %separator %site.name",
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
  ogTitle: "%s %separator %site.name",
  ogDescription: description,
  ogImage: ogImage,
  ogUrl: "%site.url" + route.fullPath,
  twitterTitle: "%s %separator %site.name",
  twitterDescription: description,
  twitterImage: ogImage,
  twitterCard: "summary_large_image",
});

watchEffect(() => {
  // Update url dynamically
  useSeoMeta({
    ogUrl: url,
  });
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
