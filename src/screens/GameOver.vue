<template>
  <div class="screen">
    <header class="header">
      <h1 class="title">Boss Smack</h1>
    </header>

    <div class="content">
      <div class="gameover">
        <div>
          <img class="image"
               alt="gameover"
               :src="`${publicPath}/screens/victory-screen.png`"/>
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
          <button class="button restart-button" v-on:click="newGame()">
          <i class="left">Nuevo juego</i>
        </button>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
  import Hero from "../components/Hero/Hero";
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
    name: 'GameOver',
    data() {
      return {
        publicPath: process.env.BASE_URL + 'assets/',
      }
    },
     created: function () {
      const {heroes, monster, monsters} = this.$route.params;

      this.heroes = heroes || defaultHeroes;
      this.monster = monster || defaultMonster;
      this.monsters = monsters;

    },
    methods: {
      newGame() {
        this.resetMonsters()
        router.push({
          name: 'characters-selection'
        })
      },
      resetMonsters(){
        for (let monster of this.monsters) {
          monster.reset();
        }
      }
    },
    components: {
      Hero
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

  .gameover {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gameover >>> .title {
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
    height: 160px;
  }

  .footer-content {
    width: 700px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .actions {
    display: flex;
    width: 400px;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }

  .button {
    border: none;
    outline: none;
    background: none;
    color: #b7b0b1;
    font-family: PressStart;
    cursor: pointer;
    display: block;
    text-align:center;
  }

  .button:hover {
    color: #bfb8b9;
  }

  

</style>
