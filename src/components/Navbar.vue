<template>
  <nav
    class="navbar bg-base-100 fixed shadow-md z-[1] rounded-b-2xl bg-opacity-70 backdrop-blur"
  >
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
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-square"
          aria-label="Menu"
        >
          <Icon name="fe:bar" class="text-2xl" />
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-opacity-90 backdrop-blur"
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
          <div class="divider my-0"></div>
          <li>
            <NuxtLink :to="ORIGINAL_SITE_URL" target="_blank">
              <Icon name="fe:wordpress-alt" class="text-xl" />
              Visit original site
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="GITHUB_REPO_URL"
              target="_blank"
            >
              <Icon name="fe:github-alt" class="text-xl" />
              View source
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
