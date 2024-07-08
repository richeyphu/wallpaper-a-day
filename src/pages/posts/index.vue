<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()

  const pageFromRoute = Number(route.query.page)

  const currentPage = ref(pageFromRoute || 1)
  const postsPerPage = ref(12)

  const apiUrl = computed(
    () =>
      `${CMS_URL}/posts?number=${postsPerPage.value}&page=${currentPage.value}`
  )

  const { data, pending, error, refresh } = await useFetch<GetPostsResponse>(
    apiUrl,
    {
      key: 'posts',
      server: true
    }
  )

  const totalPages = computed(() => {
    if (!data.value) return 0
    return Math.ceil(data.value.found / postsPerPage.value)
  })

  watch(currentPage, () => {
    refresh()
    router.replace({
      query: { ...router.currentRoute.value.query, page: currentPage.value }
    })
  })

  if (error.value) {
    console.error('Failed to fetch posts:', error.value)
  }

  useHead({
    title: 'posts'
  })
</script>

<template>
  <div class="min-h-screen bg-base-200 py-20">
    <div class="container mx-auto px-4">
      <div class="my-16 text-center">
        <h2
          class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text py-1 text-3xl font-bold text-transparent drop-shadow-sm md:text-4xl lg:text-5xl"
        >
          Posts
        </h2>
        <p class="mt-1 font-extralight tracking-[0.12em]"
          >{{ data?.found.toLocaleString() }} posts found</p
        >
      </div>
      <div
        v-if="pending"
        class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <div v-for="n in 12" :key="n">
          <div class="skeleton aspect-video" />
        </div>
      </div>
      <div
        v-else
        class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="post in data?.posts"
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
      <div class="pagination mt-6 flex items-center justify-center space-x-2">
        <div class="join shadow-sm">
          <button
            class="btn join-item"
            :disabled="currentPage <= 1"
            :class="{ 'btn-disabled': currentPage <= 1 }"
            @click="currentPage--"
          >
            <Icon name="fe:arrow-left" />
          </button>
          <button class="btn join-item">
            Page {{ currentPage }} of {{ totalPages }}
          </button>
          <button
            :disabled="currentPage >= totalPages"
            :class="{ 'btn-disabled': currentPage >= totalPages }"
            class="btn join-item"
            @click="currentPage++"
          >
            <Icon name="fe:arrow-right" />
          </button>
        </div>
      </div>
      <div class="mt-4 text-center">
        <ScrollToTopButton />
      </div>
    </div>
  </div>
</template>
