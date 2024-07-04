<template>
  <nav class="navbar bg-base-100 absolute z-[1]">
    <div class="navbar-start">
      <NuxtLink
        class="btn btn-ghost text-xl drop-shadow-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        to="/"
        >wallpaper a day</NuxtLink
      >
    </div>

    <div class="navbar-center flex"></div>

    <div class="navbar-end">
      <ThemeToggle />

      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost p-3">
          <Icon name="fe:bar" class="text-2xl" />
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/gallery">Gallery</NuxtLink>
          </li>
          <div class="divider my-0"></div>
          <li>
            <NuxtLink to="https://wallpaper-a-day.com/" target="_blank"
              >Visit original site</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="https://github.com/richeyphu/wallpaper-a-day"
              target="_blank"
              >GitHub</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
