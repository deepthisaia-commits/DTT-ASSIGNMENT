<template>
  <div>
    <header class="nav">
      <div class="nav-left"><h1>DTT Houses</h1></div>
      <nav class="nav-right">
        <RouterLink to="/" :class="{active:isActive('/')}">Houses</RouterLink>
        <RouterLink to="/create" :class="{active:isActive('/create')}">Create</RouterLink>
        <RouterLink to="/my-listings" :class="{active:isActive('/my-listings')}">My listings</RouterLink>
        <RouterLink to="/favorites" :class="{active:isActive('/favorites')}">Favorites</RouterLink>
        <RouterLink to="/about" :class="{active:isActive('/about')}">About</RouterLink>
      </nav>
    </header>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
function isActive(path){ return route.path === path }
</script>
