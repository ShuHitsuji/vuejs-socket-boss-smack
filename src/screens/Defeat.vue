<template>
  <div class="screen">
    <header class="header">
      <h1 class="title">Boss Smack</h1>
    </header>

    <div class="content">
      <div class="defeat">
        <img class="image"
               alt="defeat"
               :src="`${publicPath}/screens/lose-screen.png`"/>
        <h1 class="title">Derrota</h1>
      </div>

      <nav class="actions">
        <button class="button retry-button" v-on:click="retry()">
          <i>Reintentar</i>
        </button>
        <button class="button restart-button" v-on:click="newGame()">
          <i class="left">Nuevo juego</i>
        </button>
      </nav>
    </div>

    <footer class="footer">

    </footer>
  </div>
</template>

<script>
  import {router} from '../router'

  import createHero from '../entities/heroFactory'
  import createMonster from '../entities/monsterFactory'

  const defaultHeroes = [
    createHero({type: 'ranger'}),
    createHero({type: 'knight'}),
    createHero({type: 'mage'})
  ]

  const defaultMonster = createMonster({type: 'wisp'})

  export default {
    name: 'Defeat',
    data() {
      return {
        publicPath: process.env.BASE_URL + 'assets/',
      }
    },
    created: function () {
      const {heroes, monster} = this.$route.params;

      this.heroes = heroes || defaultHeroes;
      this.monster = monster || defaultMonster;
    },
    methods: {
      newGame() {
        this.monster.reset();
        router.push({
          name: 'characters-selection'
        })
      },
      retry() {
        this.monster.reset();
        router.push({
          name: 'combat', params: {
            heroes: this.heroes,
            monster: this.monster
          }
        })
      }
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
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 310px;
    background: #555;
    width: 100%;
    padding: 50px 0;
  }

  .defeat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .defeat >>> .title {
    font-family: Flipps;
    font-size: 40px;
    margin: 5px;
    color: #b74d4d;
  }

  .defeat >>> .image {
    width: 80px;
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
  }

  .button:hover {
    color: #bfb8b9;
  }

  .footer {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: center;
    background: #333333;
    height: 160px;
  }
</style>
