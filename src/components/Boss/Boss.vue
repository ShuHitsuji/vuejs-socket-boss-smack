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
  <img :class="[monsterClass]"
         alt="boss"
         :src="`${publicPath}/${monsterImage}`" />
</template>

<script>
  export default {
    props: ['instance'],
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
</style>
