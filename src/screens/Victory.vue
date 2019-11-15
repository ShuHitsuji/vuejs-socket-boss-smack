<template>
  <div class="screen">
    <div class="content">
      <header class="header">
        <h1 class="title">Victory!</h1>
      </header>

      <img class="image"
           alt="victory"
           :src="`${publicPath}/screens/victory-screen.png`" draggable="false" style="-moz-user-select: none;" />

      <div class="monster">
        <Boss :instance="monster" />
      </div>

    </div>
  </div>
</template>

<script>
  import Monster from "../entities/Monster";
  import Boss from "../components/Boss/Boss";

  export default {
    name: 'Victory',
    data() {
      return {
        publicPath: process.env.BASE_URL + 'assets/',
      }
    },
    props: [''],
    computed: {
      monster() {
        const monster = new Monster({
          name: 'Wisp',
          health: 250,
          attack: 45,
          type: 'wisp'
        })
        monster.setStatus('dead');
        return monster;
      }
    },
    methods: {

    },
    components: {
      Boss
    }
  }
</script>

<style scoped>
  .screen {
    display: flex;
    flex-direction: column;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-family: Flipps;
    font-size: 40px;
    margin: 5px;
    color: rgba(249, 255, 76, 0.55);
  }
</style>
