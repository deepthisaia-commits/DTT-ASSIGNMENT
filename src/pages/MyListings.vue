<template>
  <div>
    <h2>My listings</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="houses.length===0">No listings created by you yet.</div>
    <div class="grid">
      <div class="card" v-for="h in houses" :key="h.id">
        <img :src="h.image || placeholder"/>
        <h4>{{ h.address.street }} {{ h.address.number }}</h4>
        <div class="muted">{{ h.address.city }}</div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <RouterLink :to="{name:'house-detail', params:{id:h.id}}" class="btn">Details</RouterLink>
          <RouterLink :to="{name:'edit', params:{id:h.id}}">Edit</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { useUser } from '../stores/useUser'

const user = useUser()
const houses = ref([])
const loading = ref(false)
const placeholder = '/placeholder.png'

async function load(){
  loading.value = true
  try{
    // Attempt to fetch each id (could be optimized), fallback to empty
    const promises = user.myIds.map(id=> api.getHouse(id).then(r=>r.data).catch(()=>null))
    const results = await Promise.all(promises)
    houses.value = results.filter(Boolean)
  }catch(e){ console.error(e) }
  finally{ loading.value = false }
}

onMounted(load)
</script>
