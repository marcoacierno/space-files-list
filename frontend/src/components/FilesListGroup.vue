<template>
  <div>
    <h2>{{ groupName }}</h2>
    <ul>
      <li v-for="file in files" :key="file.key">
        <a target="_blank" :href="'/' + file.key">{{ file.key }}</a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'files-list-group',
  props: [
    'groupName',
    'files',
  ],
};
</script>

<style scoped>
h2, ul {
  text-align: left;
  margin: 0;
}

h2 {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  transition: opacity .3s;
}

li:hover {
  opacity: .5;
}

li a {
  display: block;

  color: #000;
  text-decoration: none;
  padding: 1rem 0;
}
</style>
