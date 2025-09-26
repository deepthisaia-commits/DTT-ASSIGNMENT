<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="house">
      <img :src="house.image || placeholder" style="width:100%;max-height:360px;object-fit:cover;border-radius:6px;"/>
      <h2>{{ house.address.street }} {{ house.address.number }} {{ house.address.addition || ''}}</h2>
      <div class="muted">{{ house.address.postalCode }} - {{ house.address.city }}</div>
      <p>{{ house.description }}</p>
      <ul>
        <li>Size: {{ house.size }} m²</li>
        <li>Bedrooms: {{ house.bedrooms }}</li>
        <li>Bathrooms: {{ house.bathrooms }}</li>
        <li>Construction: {{ house.constructionYear }}</li>
        <li>Garage: {{ house.garage ? 'Yes' : 'No' }}</li>
        <li>Price: € {{ house.price }}</li>
      </ul>
      <div style="display:flex;gap:8px;">
        <RouterLink :to="{name:'edit', params:{id:house.id}}" v-if="user.isMine(house.id)" class="btn">Edit</RouterLink>
        <button @click="confirmDelete" v-if="user.isMine(house.id)">Delete</button>
        <button @click="toggleFav(house)">{{ fav.contains(house.id)?'Unfav':'Fav' }}</button>
      </div>
    </div>
    <div v-else>House not found.</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'
import { useUser } from '../stores/useUser'
import { useFavorites } from '../stores/useFavorites'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const house = ref(null)
const loading = ref(false)
const user = useUser()
const fav = useFavorites()
const placeholder = '/placeholder.png'

async function load(){
  loading.value = true
  try{ const res = await api.getHouse(id); house.value = res.data || res.data?.data }catch(e){ console.error(e); house.value = null }
  finally{ loading.value = false }
}
async function confirmDelete(){
  if(!confirm('Are you sure you want to delete this listing?')) return
  try{ await api.deleteHouse(id); user.remove(id); router.push({name:'houses'}) }catch(e){ alert('Delete failed') }
}
function toggleFav(h){ fav.toggle(h) }

load()
</script>
