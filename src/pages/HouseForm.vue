<template>
  <div>
    <h2>{{ isEdit ? 'Edit listing' : 'Create listing' }}</h2>
    <form @submit.prevent="onSubmit">
      <label>Street</label><input v-model="form.address.street" required/>
      <label>Number</label><input v-model="form.address.number" required/>
      <label>Addition</label><input v-model="form.address.addition"/>
      <label>Postal Code</label><input v-model="form.address.postalCode" required/>
      <label>City</label><input v-model="form.address.city" required/>
      <label>Image URL</label><input v-model="form.image" type="text" placeholder="http://..." required/>
      <label>Description</label><textarea v-model="form.description" required></textarea>
      <div class="row">
        <div class="small"><label>Price</label><input v-model.number="form.price" type="number" required/></div>
        <div class="small"><label>Size (m²)</label><input v-model.number="form.size" type="number" required/></div>
        <div class="small"><label>Bedrooms</label><input v-model.number="form.bedrooms" type="number" required/></div>
        <div class="small"><label>Bathrooms</label><input v-model.number="form.bathrooms" type="number" required/></div>
      </div>
      <label>Construction year</label><input v-model.number="form.constructionYear" type="number" required/>
      <label><input type="checkbox" v-model="form.garage"/> Has garage</label>

      <div style="margin-top:12px">
        <button class="btn" type="submit">{{ isEdit ? 'Save' : 'Create' }}</button>
        <button type="button" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../services/api'
import { useUser } from '../stores/useUser'

const route = useRoute()
const router = useRouter()
const user = useUser()
const id = route.params.id
const isEdit = !!id
const form = reactive({
  address:{ street:'', number:'', addition:'', postalCode:'', city:''},
  image:'', description:'', price:0, size:0, bedrooms:0, bathrooms:0, constructionYear:new Date().getFullYear(), garage:false
})

async function load(){
  if(!isEdit) return
  try{ const res = await api.getHouse(id); const data = res.data || res.data?.data; Object.assign(form, data) }catch(e){ console.error(e) }
}
async function onSubmit(){
  // simple validation
  try{
    if(isEdit){
      await api.updateHouse(id, form)
      alert('Updated')
      router.push({name:'house-detail', params:{id}})
    }else{
      const res = await api.createHouse(form)
      // API may return created id in res.data.id or res.data._id etc.
      const newId = res.data?.id || res.data?._id || res.data
      // if response gives created object, try to get id
      const createdId = typeof newId === 'string' || typeof newId === 'number' ? newId : (res.data?.data?.id || res.data?.data?._id)
      // If we can't determine id, redirect to homes
      if(createdId){ user.add(createdId); router.push({name:'house-detail', params:{id:createdId}}) } else { alert('Created — but couldn\'t determine new ID.'); router.push({name:'houses'}) }
    }
  }catch(e){ alert('Save failed: '+ (e?.response?.data?.message || e.message)) }
}
function cancel(){ router.back() }

load()
</script>
