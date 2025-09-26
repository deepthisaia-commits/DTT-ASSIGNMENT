@@ .. @@
      <div class="card" v-for="h in houses" :key="h.id">
        <img :src="h.image || placeholder" alt="house image"/>
-        <h3>{{ h.address.street }} {{ h.address.number }}{{ h.address.addition ? '/' + h.address.addition : '' }}</h3>
-        <div class="muted">{{ h.address.postalCode }} - {{ h.address.city }}</div>
+        <h3>{{ h.address?.street || 'N/A' }} {{ h.address?.number || '' }}{{ h.address?.addition ? '/' + h.address.addition : '' }}</h3>
+        <div class="muted">{{ h.address?.postalCode || 'N/A' }} - {{ h.address?.city || 'N/A' }}</div>
         <div style="margin-top:8px">Size: {{ h.size }} m² • Beds: {{ h.bedrooms }} • Baths: {{ h.bathrooms }}</div>