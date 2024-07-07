<script setup lang="ts">
  const latestPost = ref<Post | null>(null)
  const loading = ref(true)

  onMounted(async () => {
    // Attempt to use cached data first
    const cachedPost = sessionStorage.getItem('latestPost')
    if (cachedPost) {
      latestPost.value = JSON.parse(cachedPost)
      loading.value = false // Assume not loading if cached data is used
    }

    try {
      const response = await fetch(`${CMS_URL}/posts?number=1`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = (await response.json()) as GetPostsResponse
      const newPost = data.posts[0]
      newPost.content = modifyContent(newPost.content)

      // Compare fetched data with cached data
      if (!cachedPost || JSON.stringify(newPost) !== cachedPost) {
        console.log('Latest post has changed or not cached. Updating cache.')
        sessionStorage.setItem('latestPost', JSON.stringify(newPost))
        latestPost.value = newPost
        loading.value = false
      }
      // If data is the same and we used cached data, no further action needed
    } catch (error) {
      console.error('Error fetching latest post:', error)
    }
  })
</script>

<template>
  <div class="hero min-h-screen bg-base-200 py-20">
    <div class="hero-content text-center">
      <div class="max-w-4xl">
        <h1
          class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text py-1 text-3xl font-extrabold text-transparent drop-shadow-sm md:text-5xl"
        >
          Wallpaper of the Day
        </h1>
        <div v-if="loading" class="max-w-4xl py-5">
          <div
            class="skeleton mb-8 mt-8 aspect-video w-[calc(100vw-2.2rem)] rounded-xl shadow-xl lg:h-[524px] lg:w-full"
          />
        </div>
        <div v-else>
          <div
            v-if="latestPost"
            class="mb-4 mt-8 [&_a]:link-hover [&_a]:link-secondary [&_img]:mb-4 [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:shadow-cyan-500/40 dark:[&_img]:shadow-pink-500/40 [&_p]:text-sm [&_p]:font-light"
            v-html="latestPost.content"
          />
        </div>
        <NuxtLink class="btn btn-outline btn-secondary mt-1" to="/gallery">
          Explore more
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
