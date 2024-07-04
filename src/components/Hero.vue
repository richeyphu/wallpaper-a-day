<script setup lang="ts">
import { onMounted, ref } from "vue";

const latestPost = ref<Post | null>(null);

onMounted(async () => {
  try {
    const response = await fetch(
      "https://public-api.wordpress.com/rest/v1.1/sites/wallpaper-a-day.com/posts?number=1"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    latestPost.value = data.posts[0];
  } catch (error) {
    console.error("Error fetching latest post:", error);
  }
});
</script>

<template>
  <div class="hero bg-base-200 min-h-screen py-20">
    <div class="hero-content text-center">
      <div class="max-w-4xl">
        <h1
          class="py-1 drop-shadow-sm font-extrabold text-transparent text-3xl md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Wallpaper of the Day
        </h1>
        <div
          class="mt-8 mb-4 [&_img]:rounded-xl [&_img]:shadow-xl [&_img]:mb-4 [&_p]:text-sm [&_p]:font-light [&_a]:link-secondary [&_a]:link-hover"
          v-html="latestPost.content"
          v-if="latestPost"
        ></div>
        <NuxtLink class="mt-1 btn btn-outline btn-primary" to="/gallery">
          Explore gallery
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
