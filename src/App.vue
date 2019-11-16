<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
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


  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.5s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
