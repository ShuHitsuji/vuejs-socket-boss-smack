<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
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
