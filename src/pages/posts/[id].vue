<script setup lang="ts">
const route = useRoute();
const postId = route.params.id;

const apiUrl = `${CMS_URL}/posts/${postId}`;
const { data, pending, error } = await useFetch<Post>(apiUrl);

if (error.value) {
  console.error("Failed to fetch post:", error.value);
}
</script>

<template>
  <div class="hero bg-base-200 min-h-screen py-20">
    <div class="hero-content text-center">
      <div class="max-w-4xl">
        <h1
          v-if="data"
          class="py-1 drop-shadow-sm font-bold text-transparent text-3xl md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {{ new Date(data.date).toLocaleDateString("ja") }}
        </h1>
        <div v-if="pending" class="max-w-4xl py-5">
          <div
            class="mt-8 mb-8 w-[calc(100vw-2.2rem)] lg:w-full lg:h-[524px] aspect-video skeleton rounded-xl shadow-xl"
          ></div>
        </div>
        <div v-else>
          <div
            class="mt-8 mb-4 [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:shadow-cyan-500/40 dark:[&_img]:shadow-pink-500/40 [&_img]:mb-8 [&_p]:text-sm [&_p]:font-light [&_a]:link-secondary [&_a]:link-hover"
            v-html="data.content"
            v-if="data"
          ></div>
        </div>
        <NuxtLink class="mt-1 btn btn-ghost" to="/gallery">
          <Icon name="fe:home" class="text-lg" aria-label="Go back" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>