<template>
    <div class="buttons-container">
        <Button label="Ataque" v-on:click="onAttack" />
        <Button label="Curación" v-on:click="onHeal" />
        <Button label="Acción especial" v-on:click="onSpecialAction" />
    </div>
</template>

<script>
  import Button from '../components/Button.vue'

  export default {
    name: 'ButtonsPanel',
    methods: {
      onAttack: function() {
        console.log("ataque")
      },
      onHeal: function() {
        console.log("heal")
      },
      onSpecialAction: function() {
        console.log("special")
      },
    },
    components: {
      Button
    }
  }
</script>

<style scoped>
    .buttons-container {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px;
    }
</style>
