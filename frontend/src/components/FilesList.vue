<template>
  <div class="files">
    <files-list-group group-name="Files" v-bind:files="files"></files-list-group>
  </div>
</template>

<script>
import { API_URL } from '@/utils/api';
import FilesListGroup from './FilesListGroup';

export default {
  name: 'files-list',
  components: { FilesListGroup },
  asyncComputed: {
    files: {
      async get() {
        const response = await this.$http.get(`${API_URL}space.json`);
        const contents = await response.data.contents;
        contents.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        return contents;
      },
      default: [],
    },
  },
};
</script>

<style scoped>
.files {
  width: 100%;
  height: 70rem;

  max-width: 50rem;

  padding: 1rem;
  border-radius: 3px;
  margin: 0 auto;
  background: #fff;
  overflow: scroll;
}
</style>
