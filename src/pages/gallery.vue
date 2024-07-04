<script setup lang="ts">
import { CMS_URL } from "~/utils";

useHead({
  title: "wallpaper a day / gallery",
});

const posts = ref<Post[] | null>(null);

onMounted(async () => {
  try {
    const response = await fetch(`${CMS_URL}/posts?number=60`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    posts.value = data.posts;
  } catch (error) {
    console.error("Error fetching latest post:", error);
  }
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="bg-base-200 min-h-screen py-20">
    <div class="container px-4 mx-auto">
      <h2
        class="text-center my-8 py-1 drop-shadow-sm font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Gallery
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
      >
        <div
          v-for="post in posts"
          :key="post.title"
          class="card shadow-lg hover:scale-105 hover:shadow-cyan-500/40 dark:hover:shadow-pink-500/40 transition-all duration-300"
        >
          <NuxtLink
            :to="post.URL"
            class=""
            target="_blank"
            aria-label="View wallpaper"
          >
            <NuxtPicture
              :src="
                post.attachments[Object.keys(post.attachments)[0]].thumbnails
                  .large
              "
              :alt="post.title"
              class="card-image rounded-xl w-full"
              :placeholder="
                post.attachments[Object.keys(post.attachments)[0]].thumbnails
                  .thumbnail
              "
              placeholder-class="skeleton blur-[2px]"
              format="webp"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="text-center mt-10">
        <button
          class="btn btn-ghost"
          @click="scrollToTop"
          aria-label="Go to top"
        >
          <Icon name="fe:arrow-up" class="text-lg" />
        </button>
      </div>
    </div>
  </div>
</template>
