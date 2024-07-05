<script setup lang="ts">
const latestPost = ref<Post | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch(`${CMS_URL}/posts?number=1`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    latestPost.value = data.posts[0];
    loading.value = false;
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
        <div v-if="loading" class="max-w-4xl py-5">
          <div
            class="mt-8 mb-8 w-[calc(100vw-2.2rem)] lg:w-full lg:h-[524px] aspect-video skeleton rounded-xl shadow-xl"
          ></div>
        </div>
        <div v-else>
          <div
            class="mt-8 mb-4 [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:shadow-cyan-500/40 dark:[&_img]:shadow-pink-500/40 [&_img]:mb-4 [&_p]:text-sm [&_p]:font-light [&_a]:link-secondary [&_a]:link-hover"
            v-html="latestPost.content"
            v-if="latestPost"
          ></div>
        </div>
        <NuxtLink class="mt-1 btn btn-outline btn-secondary" to="/gallery">
          Explore more
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
