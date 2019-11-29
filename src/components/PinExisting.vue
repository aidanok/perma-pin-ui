<template>
  <div class="pin-existing">
    <p> <strong>Pin Existing </strong> </p>
    <p>
      If this CID has already been pinned it will be not be re-uploaded and you will be given the existing Arweave link.
    </p>

    <input type="text" placeholder="IPFS CID" v-model="cid">
    <button @click="pin" :disabled="loading">
      {{ loading ? 'Please Wait..' : 'Perma Pin This CID' }}
    </button>
    <permafiy-result v-if="result" :result=result></permafiy-result>
    <div v-if="error" class="error"> Error -- {{ error }} </div> 
  </div>
</template>

<style scoped>
.pin-existing {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40em;
  align-items: center;
  margin-bottom: 0.2em;
}

.pin-existing p {
  font-size: 0.8em;
}

.pin-existing input {
  
  width: 30em;
  border-radius: 0.31em;
  padding: 0.7em;
  border: 1px solid #444;
}


.pin-existing button {
  margin-top: 0.2em;
  width: 20em;
  padding: 0.7em;
}


.error {
  border: 1px dashed salmon;
  padding: 1em;
  border-radius: 0.5em;
  color: rgb(228, 129, 129);
  text-align: center;
}

</style>

<script lang="ts">

import Vue from 'vue'
import { pinExisting } from '@/api';
import  PermafiyResult from './PermafiyResult.vue' 

// @ts-ignore
import isIPFS from 'is-ipfs';

export default Vue.extend({
  
  components: { PermafiyResult },

  data: () => ({
    cid: '',
    loading: false, 
    error: '',
    result: null as (object | null),
  }),

  methods: {
    async pin() {
      this.cid = this.cid.trim();
      try {
        this.loading = true; 
        this.result = null;
        this.error = '';
        if (!isIPFS.cid(this.cid)) {
          throw new Error(`Not a valid CID: ${this.cid}`);
          return;
        }
        this.result = await pinExisting(this.cid);
        this.loading = false; 
      } catch (e) {
        this.loading = false; 
        this.result = null;
        this.error = e.message; 
      }

    }
  }
})
</script>