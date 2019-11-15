<template>
  <div class="container" draggable="false" style="-moz-user-select: none;">
    <div :class="{arrow: selected}"></div>
    <img :class="[heroClass]"
         alt="character"
         :src="`${publicPath}/${heroImage}`" draggable="false" style="-moz-user-select: none;" />
  </div>
</template>

<script>
  export default {
    props: ['instance', 'selected'],
    data() {
      return {
        publicPath: process.env.BASE_URL + 'assets/characters',
      }
    },
    computed: {
      heroClass: function() { return this.instance.type },
      heroImage: function() { return this.instance.getImage() },
    },
    components: {},
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .mage,
  .ranger {
    width:77px;
    pointer-events: none;
    height:77px;
  }

  .knight {
    width:90px;
    height:90px;
    pointer-events: none;
  }

  .arrow {
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #b9b9b9;
    position: absolute;
    top: -17px;
    left: 5px;
    -webkit-animation: action .5s infinite  alternate;
    animation: action .5s infinite  alternate;
  }

  @-webkit-keyframes action {
    0% { transform: translateY(0); }
    100% { transform: translateY(-10px); }
  }
  @keyframes action {
    0% { transform: translateY(0); }
    100% { transform: translateY(-10px); }
  }
</style>
