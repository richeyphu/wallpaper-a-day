<script setup lang="ts">
useHead({
  title: `gallery / ${WEBSITE_TITLE}`,
});

const posts = ref<Post[] | null>(null);
const loading = ref(true);

onMounted(async () => {
  let cachedData = null;
  const cachedPosts = sessionStorage.getItem("posts");

  // Use cached data immediately if available
  if (cachedPosts) {
    cachedData = JSON.parse(cachedPosts);
    posts.value = cachedData;
    loading.value = false; // Assume not loading if cached data is used
  }

  try {
    const response = await fetch(`${CMS_URL}/posts?number=60`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Compare fetched data with cached data
    if (
      !cachedData ||
      JSON.stringify(data.posts) !== JSON.stringify(cachedData)
    ) {
      console.log("Data has changed or not cached. Updating cache.");
      sessionStorage.setItem("posts", JSON.stringify(data.posts));
      posts.value = data.posts;
      loading.value = false;
    }
    // If data is the same and we used cached data, no further action needed
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
      <div class="text-center my-16">
        <h2
          class="py-1 drop-shadow-sm font-bold text-transparent text-3xl md:text-4xl lg:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Gallery
        </h2>
        <p class="font-extralight tracking-[0.12em] mt-1">a wallpaper a day</p>
      </div>
      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
      >
        <div v-for="n in 60" :key="n">
          <div class="aspect-video skeleton"></div>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
      >
        <div
          v-for="post in posts"
          :key="post.title"
          class="card shadow-lg hover:scale-105 hover:shadow-cyan-500/40 dark:hover:shadow-pink-500/40 transition-all duration-300"
        >
          <NuxtLink :to="`/posts/${post.ID}`" aria-label="View wallpaper">
            <NuxtImg
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
              placeholder-class="skeleton blur-[1px]"
              format="webp"
              width="1024"
              height="576"
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
