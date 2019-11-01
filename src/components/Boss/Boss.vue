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
  <img class="boss"
       alt="monster"
       :src="`${publicPath}/spectre base.png`"
  />
</template>

<script>
  export default {
    props: ['instance'],
    data() {
      return {
        publicPath: process.env.BASE_URL + 'assets/characters',
      }
    },
    components: {},
  }
</script>


<style>
  .boss {
    width:128px;
    height:128px;
  }
</style>
