<script setup lang="ts">
import { themeChange } from "theme-change";

const colorTheme = ref<string | null>();

onMounted(() => {
  themeChange(false);
  colorTheme.value = localStorage.getItem("theme") || "light";
});
</script>

<template>
  <button
    data-toggle-theme="dark,light"
    data-act-class="ACTIVECLASS"
    class="btn btn-ghost p-3"
    @click="colorTheme = colorTheme === 'dark' ? 'light' : 'dark'"
  >
    <Icon
      v-if="colorTheme === 'light'"
      name="fe:moon"
      class="text-2xl text-indigo-400"
    />
    <Icon v-else name="fe:sunny-o" class="text-2xl text-orange-400" />
  </button>
</template>
