<script setup lang="ts">
import { themeChange } from "theme-change";

const colorTheme = ref<string | null>();

onMounted(() => {
  themeChange(false);

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    colorTheme.value = savedTheme;
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const prefersTheme = prefersDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", prefersTheme);
    colorTheme.value = prefersTheme;
    localStorage.setItem("theme", prefersTheme);
  }
});

const toggleTheme = () => {
  colorTheme.value = colorTheme.value === "dark" ? "light" : "dark";
  localStorage.setItem("theme", colorTheme.value);
};
</script>

<template>
  <button
    data-toggle-theme="dark,light"
    data-act-class="ACTIVECLASS"
    class="btn btn-ghost btn-square"
    @click="toggleTheme"
    aria-label="Toggle theme"
  >
    <Icon
      v-if="colorTheme === 'light'"
      name="fe:moon"
      class="text-2xl text-indigo-400"
    />
    <Icon v-else name="fe:sunny-o" class="text-2xl text-orange-400" />
  </button>
</template>
