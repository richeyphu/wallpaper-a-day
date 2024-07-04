<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Post {
  title: string;
  content: HTMLBodyElement;
  URL: string;
  attachments: {
    [key: string]: {
      URL: string;
      thumbnails: {
        thumbnail: string;
        medium: string;
        large: string;
      };
    };
  };
}

const posts = ref<Post[] | null>(null);

onMounted(async () => {
  try {
    const response = await fetch(
      "https://public-api.wordpress.com/rest/v1.1/sites/wallpaper-a-day.com/posts?number=60"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data.posts);
    console.log(
      data.posts[0].attachments[Object.keys(data.posts[0].attachments)[0]]
    );
    posts.value = data.posts;
  } catch (error) {
    console.error("Error fetching latest post:", error);
  }
});
</script>

<template>
  <div class="bg-base-200 min-h-screen py-20">
    <div class="container px-4 mx-auto">
      <h2
        class="text-center my-8 drop-shadow-sm font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Gallery
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
      >
        <div
          v-for="post in posts"
          :key="post.title"
          class="card shadow-lg hover:scale-105 transition-transform"
        >
          <NuxtLink :to="post.URL" class="" target="_blank">
            <img
              :src="
                post.attachments[Object.keys(post.attachments)[0]].thumbnails
                  .large
              "
              :alt="post.title"
              class="card-image rounded-xl w-full"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="text-center mt-10">
        <NuxtLink class="btn btn-outline btn-primary" to="/">
          Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
