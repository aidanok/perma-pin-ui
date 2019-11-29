<template>
  <div class="result">
    <div v-if="result.ok" class="result-box">

      <div class="row"> 
        <div class="row-label"> IPFS CID </div> 
        <div> {{ result.hash }} </div> 
      </div>
      <div class="row"> 
        <div class="row-label"> Arweave ID </div> 
        <div> {{ result.id }} </div> 
      </div>
      <div class="row"> 
        <div class="row-label"> Block Mined </div> 
        <div> {{ mined }} </div> 
      </div>

      <div class="row" v-if="mined === 'Success'"> 
        <div class="row-label"> View On Arweave </div> 
        <div> <a target="_blank" :href="`https://arweave.net/${result.id}`"> {{result.id }} </a> </div> 
      </div>

      <div class="row" v-if="mined === 'Success'"> 
        <div class="row-label"> View On IPFS </div> 
        <div> <a target="_blank" :href="`https://ipfs.infura.io/ipfs/${result.hash}`"> {{result.hash }} </a> </div> 
      </div>
    </div>

    <div v-else class="error">
      Error: {{ result.error }}
    </div>

  </div>
</template>

<style scoped>

.result {
  font-size: 0.8em;
  text-align: center;
  display: flex;
  justify-content: center;
}

.result-box {
  border: 1px dashed rgb(140, 221, 130);
  border-radius: 0.6em;
  padding: 1.25em;
}

.row {
  max-width: 40em;
  display: flex;
  border-bottom: 1px solid #ccc; 
  padding: 0.25em; 
  text-align: left;
}
.row-label {
  flex-grow: 0;
  flex-shrink: 0;
  width: 10em;
  padding-right: 0.5em;
}

</style> 

<script lang="ts">
import Vue from 'vue'
import { checkForPending } from '../api';

export default Vue.extend({
  
  props: {
    result: {
      type: Object,
      required: true, 
    }
  },

  data: () => ({
    mined: 'Pending.. Please wait, this page will update',
  }),

  created() {
    if (!this.result.ok) {
      return; 
    }
    if (this.result.alreadyPinned) {
      this.mined = 'Success'
    } else {
      this.updateMinedStatus()
    }
  },

  methods: {
    async updateMinedStatus() {
      const status = await checkForPending(this.result.id);
      if (status === 200) {
        this.mined = 'Success'
        return 
      }
      if (status === 202) {
        this.mined = 'Pending'
        return; 
      }
      if (status === 404) {
        this.mined = 'Not found! Try again.'
        return;
      }
    }
  }

})
</script>