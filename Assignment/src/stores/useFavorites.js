import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavorites = defineStore('favorites', ()=>{
  const items = ref(JSON.parse(localStorage.getItem('dtt_favorites')||'[]'))
  function save(){ localStorage.setItem('dtt_favorites', JSON.stringify(items.value)) }
  function toggle(house){
    const idx = items.value.findIndex(h=>h.id===house.id)
    if(idx>=0) items.value.splice(idx,1)
    else items.value.push(house)
    save()
  }
  function contains(id){ return items.value.some(h=>h.id===id) }
  function remove(id){ const i = items.value.findIndex(h=>h.id===id); if(i>=0){items.value.splice(i,1); save()} }
  return { items, toggle, contains, remove }
})
