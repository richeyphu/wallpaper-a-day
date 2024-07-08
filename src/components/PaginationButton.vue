<script setup>
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  })

  const emit = defineEmits(['update:currentPage'])

  function decrementPage() {
    if (props.currentPage > 1) {
      emit('update:currentPage', props.currentPage - 1)
    }
  }

  function incrementPage() {
    if (props.currentPage < props.totalPages) {
      emit('update:currentPage', props.currentPage + 1)
    }
  }
</script>

<template>
  <div class="join shadow-sm">
    <button
      class="btn join-item"
      :disabled="currentPage <= 1"
      :class="{ 'btn-disabled': currentPage <= 1 }"
      @click="decrementPage"
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
      @click="incrementPage"
    >
      <Icon name="fe:arrow-right" />
    </button>
  </div>
</template>
