<template>
  <div class="container">
    <div class="content">
      <button class="button arcade-button" v-on:click="onClick"></button>
      <label class="button-label">{{ label }}</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Button',
    props: ['label'],
    methods: {
      onClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin: 10px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: scale(.2);
    transform-origin: top center;
    margin: auto auto;
  }

  .button-label {
    margin: 20px;
    font-size: 60px;
    text-align: center;
  }

  .button {
    position: relative;
    display: inline-block;
    width: 240px;
    height: 240px;
    border: 0;
    margin: 1em;
    outline: none;
    background-color: #c2290a;
    border-radius: 50%;
    cursor: pointer;
    transition: box-shadow 200ms;
  }

  .arcade-button {
    box-shadow: inset 0 10px 0 #da2e0b, inset 0 -10px 4px #aa2409, 0 0 4px #c2290a, inset 0 0 8px #791a06, inset 0 0 8px rgba(51, 51, 51, 0.5), inset 0 0 4px 20px #c2290a, inset 0 -8px 6px 24px rgba(51, 51, 51, 0.7), inset 0 0 4px 24px #611405, inset 0 0 4px 24px rgba(51, 51, 51, 0.7), inset 0 0 2px 26.0869565217px black, inset 0 0 2px 30px rgba(247, 133, 110, 0.7), inset 0 12px 0 28.2352941176px rgba(244, 71, 37, 0.7), inset 0 -12px 4px 28.2352941176px rgba(145, 31, 8, 0.2), inset 0 0 0 43.6363636364px #c2290a, inset 0 96px 32px #aa2409, inset 0 0 24px 40px #911f08, 0 6px 12px rgba(0, 0, 0, 0.5);
  }

  .arcade-button:active {
    box-shadow: inset 0 10px 0 #da2e0b, inset 0 -10px 4px #aa2409, 0 0 4px #c2290a, inset 0 0 8px #791a06, inset 0 0 8px rgba(51, 51, 51, 0.5), inset 0 0 4px 20px #c2290a, inset 0 -8px 6px 24px rgba(51, 51, 51, 0.7), inset 0 0 4px 24px #611405, inset 0 0 4px 24px rgba(51, 51, 51, 0.7), inset 0 0 6px 28.2352941176px black, inset 0 0 2px 32px rgba(247, 133, 110, 0.2), inset 0 12px 0 28px rgba(244, 71, 37, 0.5), inset 0 -12px 4px 28px rgba(97, 20, 5, 0.2), inset 0 0 0 43.6363636364px #b32609, inset 0 96px 32px #9b2108, inset 0 0 24px 40px #791a06, 0 6px 12px rgba(0, 0, 0, 0.5);
    background-color: #b8270a;
  }
</style>
