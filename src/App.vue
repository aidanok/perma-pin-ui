<template>
  <div id="app">
    <h3>  
      Perma-Pin 
      <br> 
      IPFS Permafiying service 
    </h3>
    <p>
      Use this service to pin or add IPFS content to the Arweave blockchain, the Permanent storage 
      blockchain. <br> Once added to Arweave, the file will be seeded to the IPFS network <strong>permanently.</strong> <br>
    </p>
    
    
    <pin-existing class="pin-existing"></pin-existing>

    <upload-file class="upload-file"></upload-file>

    <p style="font-size: 0.8em; color: #666;">
      This service uses AR to save to content to Arweave and the wallet currently has: <strong>{{this.balance}}</strong>AR<br>
      You can topup this wallet by sending AR to this address: <strong>{{this.wallet}}</strong>
    </p>

    <p style="font-size: 0.8em; color: #666;">
      
      This service has a public API with Swagger/OpenAPI schema, with some extra features for uploading and pinning multiple items, 
      Try it out here: <br>
      <a target="_blank" :href="swaggerUi">{{swaggerUi}}</a><br>
      <a target="_blank" :href="swaggerSchema">{{swaggerSchema}}</a>
      <br>
      <br>
      Github <br>
      <a target="_blank" href="https://github.com/aokisok/perma-pin-lib">https://github.com/aokisok/perma-pin-lib</a><br>
      <!--<a target="_blank" href="https://github.com/aokisok/perma-pin-http">https://github.com/aokisok/perma-pin-http</a><br>
      <a target="_blank" href="https://github.com/aokisok/perma-pin-ui">https://github.com/aokisok/perma-pin-ui</a><br>
      -->

    </p>
    
    
  </div>
</template>

<style scoped>
  .upload-file, .pin-existing {
    margin-top: 2em;
    border: 1px solid #ccc;
    border-radius: 1em;
    padding: 1em;
    max-width: 40em;
    margin-left: auto;
    margin-right: auto;
  }

  a {
    color:rgb(54, 77, 134)
  }
</style>

<script lang="ts">

import Vue from 'vue';
import PinExisting from '@/components/PinExisting.vue';
import UploadFile from '@/components/UploadFile.vue';
import { getWalletInfo } from './api';

export default Vue.extend({
  components: { PinExisting, UploadFile },
  name: 'app',

  data: () => ({
    wallet: ' ... ',
    balance: ' ... '
  }),

  created() {
    this.updateWalletInfo();
    setInterval(() => this.updateWalletInfo(), 1000*45);
  },

  methods: {
    updateWalletInfo() {
      getWalletInfo().then(x => {
        this.wallet = x.wallet;
        this.balance = x.balance.toFixed(5);
      })
    }
  }, 

  computed: {
    swaggerUi(): string { 
      return `${process.env.VUE_APP_API_ENDPOINT}/`;
    },
    swaggerSchema(): string { 
      return `${process.env.VUE_APP_API_ENDPOINT}/api.json`;
    }

  }

});

</script>

<style>

body, html {
  height: 100%;
  min-height: 100%;
  background: rgb(223, 231, 220);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
