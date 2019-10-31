<template>
  <div class="container">
    <div class="character-column">
      <label class="character">{{ label }}</label>
    </div>
    <div class="bars-column">
      <Bar :color="colors.health" :percentage="status.health.current / status.health.max * 100"></Bar>
      <Bar v-if="hasMana" :color="colors.mana" :percentage="getMana"></Bar>
    </div>
    <div class="status-column">
      <label class="status">{{ status.health.current }}/{{ status.health.max }}</label>
    </div>
  </div>
</template>

<script>
  import Bar from './Bar.vue'

  export default {
    name: 'StatusBar',
    props: ['label', 'status', 'colors'],
    components: {
      Bar
    },
    computed: {
      hasMana: function () {
        return typeof this.status.mana !== 'undefined'
      },
      getMana: function () {
        return this.status.mana ? this.status.mana.current / this.status.mana.max * 100 : null
      },
    }
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

  .status-column {
    width: 140px;
    text-align: right;
  }
</style>
