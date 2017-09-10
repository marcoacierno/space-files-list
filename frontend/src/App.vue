<template>
  <div id="app">
    <img src="./assets/spaces-welcome.svg" width="150" height="150" style="margin-bottom: 2rem">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
html {
  font-size: 62.5%;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-size: 1.6rem;
  background: #F7F7F7;
}

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
