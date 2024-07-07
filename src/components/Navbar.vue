<template>
  <nav
    class="navbar fixed z-[1] rounded-b-2xl bg-base-100 bg-opacity-70 shadow-md backdrop-blur"
  >
    <div class="navbar-start">
      <NuxtLink
        class="btn btn-ghost bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-xl font-bold text-transparent drop-shadow-sm"
        to="/"
        >wallpaper a day</NuxtLink
      >
    </div>

    <div class="navbar-center flex" />

    <div class="navbar-end">
      <ThemeToggle />

      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-square btn-ghost"
          aria-label="Menu"
        >
          <Icon name="fe:bar" class="text-2xl" />
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 bg-opacity-90 p-2 shadow backdrop-blur"
        >
          <li>
            <NuxtLink to="/">
              <Icon name="fe:home" class="text-xl" />
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/gallery">
              <Icon name="fe:picture" class="text-xl" />
              Gallery
            </NuxtLink>
          </li>
          <div class="divider my-0" />
          <li>
            <NuxtLink :to="ORIGINAL_SITE_URL" target="_blank">
              <Icon name="fe:wordpress-alt" class="text-xl" />
              Visit original site
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="GITHUB_REPO_URL" target="_blank">
              <Icon name="fe:github-alt" class="text-xl" />
              View source
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
