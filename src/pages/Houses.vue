<template>
  <div>
    <div class="controls">
      <input class="search" v-model="q" placeholder="Search by address, city or postal code" @input="onInput"/>
      <select v-model="sort"><option value="">Sort</option><option value="price_asc">Price ↑</option><option value="price_desc">Price ↓</option><option value="size_desc">Size ↓</option></select>
      <button class="btn" @click="search">Search</button>
      <button @click="clear">Clear</button>
    </div>
    <div class="muted">{{ resultText }}</div>

    <div v-if="loading">Loading...</div>
    <div v-else class="grid">
      <div class="card" v-for="h in houses" :key="h.id">
        <img :src="h.image || placeholder" alt="house image"/>
        <h3>{{ h.address?.street || 'N/A' }} {{ h.address?.number || '' }}{{ h.address?.addition ? '/' + h.address.addition : '' }}</h3>
        <div class="muted">{{ h.address?.postalCode || 'N/A' }} - {{ h.address?.city || 'N/A' }}</div>
        <div style="margin-top:8px">Size: {{ h.size }} m² • Beds: {{ h.bedrooms }} • Baths: {{ h.bathrooms }}</div>
        <div style="margin-top:auto;display:flex;gap:8px;align-items:center;margin-top:10px;">
          <RouterLink :to="{name:'house-detail', params:{id:h.id}}" class="btn">Details</RouterLink>
          <button @click="toggleFav(h)">{{ favStore.contains(h.id)?'Unfav':'Fav' }}</button>
        </div>
      </div>
    </div>

    <div style="margin-top:16px;display:flex;gap:8px;align-items:center;justify-content:center;">
      <button @click="prev" :disabled="page===1">Prev</button>
      <span>Page {{page}}</span>
      <button @click="next" :disabled="houses.length < pageSize">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '../services/api'
import { useFavorites } from '../stores/useFavorites'

const q = ref('')
const sort = ref('')
const page = ref(1)
const pageSize = 12
const houses = ref([])
const loading = ref(false)
const favStore = useFavorites()
const placeholder = '/placeholder.png'

function buildParams(){
  const params = { _page: page.value, _limit: pageSize }
  if(q.value) params.q = q.value
  if(sort.value) params._sort = sort.value
  return params
}

async function fetchPage(){
  loading.value = true
  try{
    const res = await api.listHouses(buildParams())
    // API may return data array or object; handle common case
    houses.value = res.data?.data || res.data || []
  }catch(e){ console.error(e); houses.value = [] }
  finally{ loading.value = false }
}

function search(){ page.value = 1; fetchPage() }
function clear(){ q.value=''; sort.value=''; page.value=1; fetchPage() }
function next(){ page.value++; fetchPage() }
function prev(){ if(page.value>1){ page.value--; fetchPage() } }
function onInput(){ /* show clear button by user story; clearing handled */ }
function toggleFav(h){ favStore.toggle(h) }

const resultText = computed(()=> houses.value.length ? (houses.value.length + ' result(s) found') : 'No results found')

// initial load
fetchPage()
</script>
