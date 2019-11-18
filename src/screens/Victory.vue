<template>
  <div class="screen">
    <header class="header">
      <h1 class="title">Boss Smack</h1>
    </header>

    <div class="content">
      <div class="victory">
        <div class="monster">
          <Boss :instance="monster"/>
        </div>
        <h1 class="title">Victory!</h1>
      </div>

      <div class="characters-container">
        <div class="character"
             v-for="(hero, index) in heroes"
             :key="index"
        >
          <Hero :instance="hero"/>
        </div>
      </div>


    </div>

    <footer class="footer">
      <div class="footer-content">
        <nav class="start">
          <button class="start-button">
            <i class="arrow left" v-on:click="nextCombat()"></i>
          </button>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
  import Hero from "../components/Hero/Hero";
  import Boss from "../components/Boss/Boss";
  import {router} from '../router'

  import createHero from '../entities/heroFactory'
  import createMonster from  '../entities/monsterFactory'

  const defaultHeroes = [
    createHero({type: 'ranger'}),
    createHero({type: 'knight'}),
    createHero({type: 'mage'})
  ]

  const defaultMonster = createMonster({type: 'wisp'})

  export default {
    name: 'Victory',
    data() {
      return {
        publicPath: process.env.BASE_URL + 'assets/',
      }
    },
    created: function () {
      const {heroes, monster, nextMonster} = this.$route.params;

      this.heroes = heroes || defaultHeroes;
      this.monster = monster || defaultMonster;
      this.nextMonster = nextMonster || null;
    },
    methods: {
      nextCombat() {
        router.push({
          name: 'combat', params: {
            heroes: this.heroes,
            monster: this.nextMonster
          }
        })
      }
    },
    components: {
      Hero, Boss
    }
  }
</script>

<style scoped>
  .screen {
    display: flex;
    flex-direction: column;
  }

  .header {
    flex: 1;
    width: 100%;
    display: flex;
    background: #333538;
    padding: 0;
    padding: 0 30px;
  }

  .title {
    font-family: Flipps;
    font-size: 40px;
    margin: 5px;
    color: rgba(249, 255, 76, 0.55);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px auto 0 auto;
    max-width: 700px;
  }

  .victory {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .victory >>> .title {
    font-family: Flipps;
    font-size: 40px;
    margin: 5px;
    color: #a57a45;
  }

  .characters-container {
    display: flex;
    flex-direction: row;
    margin: 36px;
  }

  .footer {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: center;
    position: relative;
    top: -30px;
  }

  .footer-content {
    width: 700px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .monster {
    opacity: 70%;
  }

  .start-button {
    display: block;
    width: 100px;
    height: 100px;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    top: 16px;
  }

  .arrow {
    border: solid #a97171;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    -webkit-animation: action 1s infinite alternate;
    animation: action .7s infinite alternate;
  }

  @-webkit-keyframes action {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-5px);
    }
  }

  @keyframes action {
    0% {
      transform: rotate(-45deg) scale(5) translateX(0);
    }
    100% {
      transform: rotate(-45deg) scale(5) translateX(-2px) translateY(-2px);
    }
  }
</style>
