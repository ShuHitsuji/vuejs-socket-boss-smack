<template>
  <div class="screen">
    <section class="characters-selection">
      <h1 class="title">Bienvenidos al combate</h1>
      <h2 class="subtitle">Elijan sus personajes</h2>
      <div class="characters-container">
        <div class="character">
          <drop @drop="(player) => handleDrop(player, 'ranger')">
            <div class="selectors">
              <div v-for="selector in droppables.ranger"
                   :key="selector"
                   class="selector"></div>
            </div>
            <Hero :instance="heroes.ranger" />
          </drop>
        </div>
        <div class="character">
          <drop @drop="(player) => handleDrop(player, 'knight')">
            <div class="selectors">
              <div v-for="selector in droppables.knight"
                   :key="selector"
                   class="selector"></div>
            </div>
            <Hero :instance="heroes.knight" />
          </drop>
        </div>
        <div class="character">
          <drop @drop="(player) => handleDrop(player, 'mage')">
            <div class="selectors">
              <div v-for="selector in droppables.mage"
                   :key="selector"
                   class="selector"></div>
            </div>
            <Hero :instance="heroes.mage" />
          </drop>
        </div>
      </div>
      <div class="selectors">
        <drag v-for="selector in draggables"
              :key="selector"
              class="selector"
              :transfer-data="selector"
              :effect-allowed="['move']"
              :image-x-offset="-30"
              :image-y-offset="180"
        ></drag>
      </div>
    </section>
    <footer class="footer">
      <aside class="tutorial">
        <i>i</i>
      </aside>
      <main class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </main>
      <nav class="start">
        <i class="arrow left"></i>
      </nav>
    </footer>
  </div>
</template>

<script>
import Hero from "../components/Hero/Hero";
import Player from '../entities/Player'
import { Drag, Drop } from 'vue-drag-drop';

const heroes = {
  ranger: new Player({
    type: 'ranger',
    health: 150,
    mana: 60,
    attack: 60
  }),
  knight: new Player({
    type: 'knight',
    health: 200,
    mana: 30,
    attack: 35
  }),
  mage: new Player({
    type: 'mage',
    health: 100,
    mana: 100,
    attack: 80
  })
}

export default {
  name: 'CharactersSelection',
  data: () => {
    return {
      heroes,
      draggables: [1, 2, 3],
      droppables: {
        ranger: [],
        knight: [],
        mage: [],
      }
    }
  },
  methods: {
    handleDrop(player, type) {
      this.droppables[type].push(player);
      this.draggables = this.draggables.filter(number => number !== player);
    },
  },
  components: {
    Hero, Drag, Drop
  }
}
</script>

<style scoped>
  .screen {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-family: Flipps;
    font-size: 40px;
    margin: 5px;
    color: rgba(249, 255, 76, 0.55);
  }

  .subtitle {
    font-size: 20px;
    margin: 2px;
    color: rgba(249, 255, 76, 0.55);
  }

  .characters-selection {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #545b61;
  }

  .characters-container {
    display: flex;
    align-items: flex-end;
    min-height: 200px;
  }

  .character {
    margin: 20px;
  }

  .selectors {
    display: flex;
    align-items: flex-end;
    min-height: 60px;
  }

  .selector {
    background: #9fa7ad;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    margin: 10px;
  }

  .footer {
    display: flex;
    min-height: 300px;
    background: #333;
    justify-content: space-between;
  }

  .tutorial {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .description {
    flex: 2;
    padding: 10px;
    color: white;
    font-family: PressStart;
    font-size: 12px;
  }

  .start {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow {
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    transform: rotate(-45deg) scale(5);
    -webkit-transform: rotate(-45deg) scale(5);
  }
</style>
