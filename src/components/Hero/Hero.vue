<template>
  <div class="heroSprite">
    <div class="heroImage">
      <img v-show="currentHeroState == 'Idle'" src="Placeholder">
      <img v-show="currentHeroState == 'Attacking'" src="Placeholder">
      <img v-show="currentHeroState == 'Special'" src="Placeholder">
      <img v-show="currentHeroState == 'Healing'" src="Placeholder">
      <img v-show="currentHeroState == 'Hurt'" src="Placeholder">
    </div>    
  </div>
</template>

<script>
  export default {
    props: [],
    data() { return {
        health: 
    }
  },
    components: {},
    mounted() {
      let self = this
      window.addEventListener('keydown', function(e) {
        if (self && self.$store) {
          let view = self.$store.state.currentView
          if (view != 'playGame') {
            return
          }
        }
        
        if (e.keyCode == 65) {
          self.heroAttack()
        }
        if (e.keyCode == 72) {
          self.heroHeal()
        }
        if (e.keyCode == 83) {
          self.heroSpecialAttack()
        }
      });
    },
    computed: {
      currentHeroState() {
        return this.$store.state.currentHeroState
      },
      currentHealth() {
        return this.$store.state.currentHeroHealth
      },
      maxHealth() {
        return this.$store.state.currentHeroMaxHealth
      },
      heroLevel() {
        return this.$store.state.currentHeroLevel
      },
      heroAttackPower() {
        return this.heroLevel * 10
      },
      heroHealPower() {
        return this.heroLevel * 20
      },
      calculateHealthBar() {
        let color
        if (this.currentHeroState == "Idle") color = 'red'
        if (this.currentHeroState == "poisoned") color = 'green'
        return {
          width: (this.currentHealth/this.maxHealth)*100 + '%',
          background: 'color'
        }
      }
    },
    methods: {
      heroAttack() {
        this.$store.commit('damageEnemy', this.heroAttackPower)
        this.$store.commit('updateHeroStatus', 'Attacking')
        this.$store.commit('damageHero')
        let message = {
          action: 'attack',
          amount: this.heroAttackPower,
          cooldown: this.cooldown
        }
        this.$store.commit('updateCurrentActionMessages', message)
        if (this.cooldown > 0) {
          this.cooldown -= 1
        }
      },
      heroHeal() {
        this.$store.commit('healHero', this.heroHealPower)
        this.$store.commit('damageHero')
        let message = {
          action: 'heal',
          amount: this.heroHealPower,
          cooldown: this.cooldown
        }
        this.$store.commit('updateCurrentActionMessages', message)
        if (this.cooldown > 0) {
          this.cooldown -= 1
        }
      },
      heroSpecialAttack() {
        if (this.cooldown > 0) {
          return
        }
        let specialAttackPower = this.heroAttackPower * 1.5
        this.$store.commit('damageEnemy', specialAttackPower)
        this.$store.commit('updateHeroStatus', 'Attacking')
        this.$store.commit('damageHero')
        this.cooldown = 3
        let message = {
          action: 'special attack',
          amount: specialAttackPower,
          cooldown: this.cooldown
        }
        this.$store.commit('updateCurrentActionMessages', message)
      }
    },
    watch: {
      currentHeroState() {
        if (this.currentHeroState == 'Dead') {
          this.$store.commit('changeView', 'gameOver')
        }
      }
    }
  }
</script>