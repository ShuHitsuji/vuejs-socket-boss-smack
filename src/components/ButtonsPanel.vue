<template>
    <div class="buttons-container">
        <Button label="Ataque" v-on:click="onAttack" :disabled="disabled"/>
        <Button label="Curación" v-on:click="onHeal" :disabled="disabled"/>
        <Button label="Acción especial" v-on:click="onSpecialAction" :disabled="disabled" />
    </div>
</template>

<script>
  import Button from '../components/Button.vue'

  export default {
    name: 'ButtonsPanel',
    props: ['disabled'],
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
