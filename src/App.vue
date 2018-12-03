<template>
  <div id="app">
    <div class="container">
      <h1 class="display-1 text-center">Advent of Code</h1>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
