<template>
  <div class="bossSprite">
    <div class="bossImage">
      <img v-show="currentHeroState == 'Idle'" src="Placeholder">
      <img v-show="currentHeroState == 'Attacking'" src="Placeholder">
      <img v-show="currentHeroState == 'Special'" src="Placeholder">
      <img v-show="currentHeroState == 'Healing'" src="Placeholder">
      <img v-show="currentHeroState == 'Hurt'" src="Placeholder">
    </div>    
  </div>
</template>

<script>
    <!-- TODO -->
</script>