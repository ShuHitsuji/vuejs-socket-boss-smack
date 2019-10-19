<template>
  <div id="app">
    <CharactersSelection/>
  </div>
</template>

<script>
import CharactersSelection from './components/CharactersSelection.vue'

export default {
  name: 'app',
  components: {
    CharactersSelection
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
