<template>
  <div>
    <h2>Favorites</h2>
    <div v-if="items.length===0">No favorites yet.</div>
    <div class="grid">
      <div class="card" v-for="h in items" :key="h.id">
        <img :src="h.image || placeholder"/>
        <h4>{{ h.address.street }} {{ h.address.number }}</h4>
        <div class="muted">{{ h.address.city }} • € {{ h.price }}</div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <RouterLink :to="{name:'house-detail', params:{id:h.id}}" class="btn">Details</RouterLink>
          <button @click="remove(h.id)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useFavorites } from '../stores/useFavorites'
const fav = useFavorites()
const items = computed(()=> fav.items )
const placeholder = '/placeholder.png'
function remove(id){ fav.remove(id) }
</script>
