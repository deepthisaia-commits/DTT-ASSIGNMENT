import { defineStore } from 'pinia'
import { ref } from 'vue'

// Simple store to mark created houses as 'mine' (store their ids)
export const useUser = defineStore('user', ()=>{
  const myIds = ref(JSON.parse(localStorage.getItem('dtt_my_ids')||'[]'))
  function add(id){ if(!myIds.value.includes(id)){ myIds.value.push(id); save() } }
  function remove(id){ const i=myIds.value.indexOf(id); if(i>=0){ myIds.value.splice(i,1); save() } }
  function save(){ localStorage.setItem('dtt_my_ids', JSON.stringify(myIds.value)) }
  function isMine(id){ return myIds.value.includes(id) }
  return { myIds, add, remove, isMine }
})
