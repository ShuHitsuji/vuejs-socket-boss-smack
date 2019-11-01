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
        this.$emit('attack')
      },
      onHeal: function() {
        this.$emit('heal')
      },
      onSpecialAction: function() {
        this.$emit('special')
      }
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