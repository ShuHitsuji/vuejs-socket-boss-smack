<template>
<!--  <div class="heroSprite">-->
<!--    <div class="heroImage">-->
<!--      <img v-show="currentHeroState == 'Idle'" src="Placeholder">-->
<!--      <img v-show="currentHeroState == 'Attacking'" src="Placeholder">-->
<!--      <img v-show="currentHeroState == 'Special'" src="Placeholder">-->
<!--      <img v-show="currentHeroState == 'Healing'" src="Placeholder">-->
<!--      <img v-show="currentHeroState == 'Hurt'" src="Placeholder">-->
<!--    </div>-->
<!--  </div>-->
  <img class="boss-img" alt="boss"
       :src="`${publicPath}/${heroImage}`"
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
    computed: {
      heroClass: function() { return this.instance.type.keyName },
      heroImage: function() { return this.instance.type.img },
    },
    components: {},
  }
</script>

<style>
  .mage,
  .ranger {
    width:77px;
    height:77px;
  }

  .knight {
    width:90px;
    height:90px;
  }
</style>
