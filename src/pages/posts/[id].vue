<script setup lang="ts">
  const route = useRoute()
  const postId = route.params.id

  const apiUrl = `${CMS_URL}/posts/${postId}`
  const { data, pending, error } = await useFetch<Post>(apiUrl)

  if (error.value) {
    console.error('Failed to fetch post:', error.value)
  }

  const title = computed(() => {
    if (data.value?.date) {
      return new Date(data.value.date).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    return 'not found' // Fallback title
  })

  onMounted(() => {
    if (data.value) {
      data.value.content = modifyContent(data.value.content)
    }
  })

  useHead({
    title: title.value
  })
</script>

<template>
  <div class="hero min-h-screen bg-base-200 py-20">
    <div class="hero-content text-center">
      <div class="max-w-4xl">
        <h1
          v-if="data"
          class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text py-1 text-3xl font-bold text-transparent drop-shadow-sm md:text-5xl"
        >
          {{ title }}
        </h1>
        <div v-if="pending" class="max-w-4xl py-5">
          <div
            class="skeleton mb-8 mt-8 aspect-video w-[calc(100vw-2.2rem)] rounded-xl shadow-xl lg:h-[524px] lg:w-full"
          />
        </div>
        <div v-else>
          <div
            v-if="data"
            class="mb-4 mt-8 [&_a]:link-hover [&_a]:link-secondary [&_img]:mb-8 [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:shadow-cyan-500/40 dark:[&_img]:shadow-pink-500/40 [&_p]:text-sm [&_p]:font-light"
            v-html="data.content"
          />
        </div>
        <NuxtLink class="btn btn-square btn-ghost mt-1" @click="$router.back">
          <Icon name="fe:home" class="text-lg" aria-label="Go back" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
