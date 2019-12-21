<template>
  <div id="app">
    <h3>节日头像生成器</h3>
    <Main />
  </div>
</template>

<script>
import Main from './components/main.vue'

export default {
  name: 'app',
  components: {
    Main,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 20px auto 0;
}
</style>
