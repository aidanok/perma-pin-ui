<template>
  <div class="upload-file">
    <p><strong>Upload New File</strong> </p>
    <p>
      This file will be added to IPFS and pinned. If it is permafiyed already, you will be given the existing Arweave link.
    </p>

    <form :action=actionUrl method="post" enctype="multipart/form-data" v-on:submit.prevent="onSubmit">
      <label for="file">Filename:</label>
      <input type="file" name="file" id="file" ref="file"/>
      <br>
      <input class="submit-button" type="submit" name="submit" :disabled=loading :value="loading ? 'Uploading..' : 'Upload'" />
    </form>

    <permafiy-result v-if="result" :result=result></permafiy-result>
    
    <div v-if="error" class="error"> Error -- {{ error }} </div> 

  </div>
</template>

<style scoped>

.upload-file {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.upload-file p {
  font-size: 0.8em;
}

.submit-button {
  font-size: 1em;
  padding: 0.25em 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em; 
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

import PermafiyResult from './PermafiyResult.vue';

export default Vue.extend({
  
  components: { PermafiyResult },

  data:() => ({
    loading: false,
    error: '',
    result: null as (object | null),
  }),

  computed: {
    actionUrl: function(): string {
      return `${process.env.VUE_APP_API_ENDPOINT}/upload`
    }
  }, 

  methods: {
    async onSubmit() {
      try { 
        this.loading = true; 
        this.result = null;
        this.error = '';
        var formData = new FormData();
        const file = (this.$refs.file as any).files[0];
        if (!file) {
          throw new Error('No file');
        }
        formData.append("file", file);
        const result = await fetch(this.actionUrl, { body: formData, method: 'POST' }).then(x => x.json());
        this.result = result; 
        this.loading = false;
        this.error = '';
      } catch (e) {
        console.error(e);
        this.loading = false;
        this.result = null;
        this.error = e.message;
      }
      (this.$refs.file as any).value = '';
    }
  }
})
</script>

