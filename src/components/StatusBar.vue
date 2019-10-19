<template>
  <div class="container">
    <div class="character-column">
      <label class="character">{{ label }}</label>
    </div>
    <div class="bars-column">
      <div class="bar" :style="{background: color}"></div>
      <div class="bar" :style="{background: color, width: '240px'}"></div>
    </div>
    <div class="status-column">
      <label class="status">{{ status }}</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StatusBar',
    props: ['label', 'status', 'color']
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    justify-content: center;
    align-items: center;
  }

  .character-column {
    width: 140px;
  }

  .bars-column {
    flex: 2;
    display: flex;
    flex-direction: column;
    width: 200px;
  }

  .bar {
    height: 10px;
    margin: 1px;
  }

  .status-column {
    width: 140px;
    text-align: right;
  }
</style>
