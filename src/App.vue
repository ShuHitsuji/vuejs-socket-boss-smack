<template>
  <div id="app">
    <Combat />
  </div>
</template>

<script>
import CharactersSelection from './screens/CharactersSelection.vue'
import Combat from './screens/Combat.vue'

export default {
  name: 'app',
  components: {
    CharactersSelection, Combat
  }
}
</script>

<style>
@font-face {
  font-family: Flipps;
  src: url("assets/fonts/Fipps-Regular.otf") format("opentype");
}

@font-face {
  font-family: PressStart;
  src: url("assets/fonts/PressStart2P.ttf") format("truetype");
}

html, body {
  margin: 0;
  padding: 0;
  background: #222;
}

#app {
  font-family: PressStart;
}
</style>
