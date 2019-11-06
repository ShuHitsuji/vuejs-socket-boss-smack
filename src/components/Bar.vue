<template>
    <div class="bar" :style="{background: color, width: percentage + '%'}"></div>
</template>

<script>
  export default {
    name: 'Bar',
    props: ['percentage', 'color']
  }
</script>

<style scoped>
    .bar {
        height: 10px;
        margin: 1px;
        transition: width 500ms;
    }
</style>
