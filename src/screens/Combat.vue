<template>
  <div class="screen">
    <section class="combat-section">
      <div class="players-area">
        <div class="column left">
          <div class="character">
            <Hero :instance="heroes[0]" />
          </div>
        </div>
        <div class="column right">
          <div class="character">
            <Hero :instance="heroes[1]" />
          </div>
          <div class="character">
            <Hero :instance="heroes[2]" />
          </div>
        </div>
      </div>
      <div class="monster-area">
        <div class="monster">
         <Boss />
        </div>
      </div>
    </section>
    <footer class="footer">
      <aside class="actions-area">
        <ButtonsPanel v-on:attack="playerAttacks" v-on:heal="playerHeals" v-on:special="playerDoSomethingSpecial" />
      </aside>
      <main class="status-area">
        <StatusBar v-for="hero in heroes"
                   :key="hero.name"
                   :label="hero.name"
                   :status="{ health: hero.health, mana: hero.mana }"
                   :colors="{ health: '#8cdc07', mana: '#5a5adc' }"
        />
        <StatusBar label="Boss"
                   :status="{ health: { max: 500, current: 500 } }"
                   :colors="{ health: 'red' }"
        />
      </main>
      <nav class="bard-area">
        {{ lastAction }}
      </nav>
    </footer>
  </div>
</template>

<script>
import StatusBar from "../components/StatusBar";
import Player from '../entities/Player'
import ButtonsPanel from '../components/ButtonsPanel'
import Hero from "../components/Hero/Hero";
import Boss from "../components/Boss/Boss";
import HeroFactory from '../components/HeroFactory';

const heroes = [
  new Player({
    name: 'Guille',
    type: 'ranger',
    health: 150,
    mana: 60,
    attack: 60
  }),
  new Player({
    name: 'Francho',
    type: 'knight',
    health: 200,
    mana: 30,
    attack: 35
  }),
  new Player({
    name: 'Axel',
    type: 'mage',
    health: 100,
    mana: 100,
    attack: 80
  })
]

export default {
  name: 'Combat',
  data: () => {
    return {
      heroes,
      currentPlayer: heroes[0],
      lastAction: ""
    }
  },
  methods: {
    playerAttacks: function () {
      this.lastAction = "Current player attacks"
    },
    playerHeals: function () {
      this.lastAction = "Current player heal"
    },
    playerDoSomethingSpecial: function () {
      this.lastAction = "Current player do somethings special"
    }
  },
  components: {
    Hero,
    Boss,
    StatusBar,
    ButtonsPanel
  }
}
</script>

<style scoped>
  .screen {
    display: flex;
    flex-direction: column;
    color: white;
  }

  .combat-section{
    flex: 1;
    width: 100%;
    display: flex;
    background: #555;
  }

  .players-area {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: 300px;
    width: 80px;
  }

  .character {
    margin: 20px;
  }

  .monster-area {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer {
    display: flex;
    min-height: 160px;
    background: #333;
    justify-content: space-between;
    align-items: center;
  }

  .status-area {
    flex: 2;
    padding: 10px;
  }

  .bard-area {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
