<script setup lang="ts">
  const posts = ref<Post[] | null>(null)
  const loading = ref(true)

  onMounted(async () => {
    let cachedData = null
    const cachedPosts = sessionStorage.getItem('posts')

    // Use cached data immediately if available
    if (cachedPosts) {
      cachedData = JSON.parse(cachedPosts)
      posts.value = cachedData
      loading.value = false // Assume not loading if cached data is used
    }

    try {
      const response = await fetch(`${CMS_URL}/posts?number=60`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // Compare fetched data with cached data
      if (
        !cachedData ||
        JSON.stringify(data.posts) !== JSON.stringify(cachedData)
      ) {
        console.log('Data has changed or not cached. Updating cache.')
        sessionStorage.setItem('posts', JSON.stringify(data.posts))
        posts.value = data.posts
        loading.value = false
      }
      // If data is the same and we used cached data, no further action needed
    } catch (error) {
      console.error('Error fetching latest post:', error)
    }
  })

  useHead({
    title: 'gallery'
  })
</script>

<template>
  <div class="min-h-screen bg-base-200 py-20">
    <div class="container mx-auto px-4">
      <div class="my-16 text-center">
        <h2
          class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text py-1 text-3xl font-bold text-transparent drop-shadow-sm md:text-4xl lg:text-5xl"
        >
          Gallery
        </h2>
        <p class="mt-1 font-extralight tracking-[0.12em]">a wallpaper a day</p>
      </div>
      <div
        v-if="loading"
        class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <div v-for="n in 60" :key="n">
          <div class="skeleton aspect-video" />
        </div>
      </div>
      <div
        class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="post in posts"
          :key="post.title"
          class="card shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 dark:hover:shadow-pink-500/40"
        >
          <NuxtLink :to="`/posts/${post.ID}`" aria-label="View wallpaper">
            <NuxtImg
              :src="
                post.attachments[Object.keys(post.attachments)[0]].thumbnails
                  .large
              "
              :alt="post.title"
              class="card-image w-full rounded-xl"
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
      <div class="mt-10 text-center">
        <ScrollToTopButton />
      </div>
    </div>
  </div>
</template>
