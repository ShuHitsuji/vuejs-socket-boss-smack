<template>
<!--  <div class="bossSprite">-->
<!--    <div class="bossImage">-->
<!--      <img v-show="currentHeroState == 'Idle'" src="Placeholder">-->
<!--      <img v-show="currentHeroState == 'Attacking'" src="Placeholder">-->
<!--      <img v-show="currentHeroState == 'Special'" src="Placeholder">-->
<!--      <img v-show="currentHeroState == 'Healing'" src="Placeholder">-->
<!--      <img v-show="currentHeroState == 'Hurt'" src="Placeholder">-->
<!--    </div>-->
<!--  </div>-->
  <div class="container">
    <div :class="{arrow: selected}"></div>
    <img :class="[monsterClass]"
         alt="boss"
         :src="`${publicPath}/${monsterImage}`" />
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
      monsterClass: function() { return this.instance.type.keyName },
      monsterImage: function() { return this.instance.type.img },
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
  .boss {
    width:128px;
    height:128px;
  }
  .wisp{
    width:80px;
    height:80px;
  }
  .slime {
    width:100px;
    height:100px;
  }
  .fish {
    width:110px;
    height:110px;
  }
  .tv{
    width:128px;
    height:128px;
  }

  .arrow {
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #b9b9b9;
    position: relative;
    top: -17px;
    left: -5px;
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
