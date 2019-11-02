<template>
  <div class="screen">
    <section class="combat-section">
      <div class="players-area">
        <div class="column left">
          <div class="character">
            <Hero :instance="players[0]" :selected="isSelected(0)" />
          </div>
        </div>
        <div class="column right">
          <div class="character">
            <Hero :instance="players[1]" :selected="isSelected(1)" />
          </div>
          <div class="character">
            <Hero :instance="players[2]" :selected="isSelected(2)" />
          </div>
        </div>
      </div>
      <div class="monster-area">
        <div class="monster">
          <Boss/>
        </div>
      </div>
    </section>
    <footer class="footer">
      <aside class="actions-area">
        <ButtonsPanel v-on:attack="playerAttacks" v-on:heal="playerHeals" v-on:special="playerDoSomethingSpecial"/>
      </aside>
      <main class="status-area">
        <StatusBar v-for="hero in players"
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
      <div class="bard-area">
        <p>{{ lastAction }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
  import StatusBar from "../components/StatusBar";
  import Player from '../entities/Player'
  import ButtonsPanel from '../components/ButtonsPanel'
  import Hero from "../components/Hero/Hero";
  import Boss from "../components/Boss/Boss";

  const players = [
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
        players,
        currentPlayer: 0,
        lastAction: ""
      }
    },
    methods: {
      playerAttacks() {
        this.lastAction = `${this.getCurrentPlayer().name} attacks`;
        this.nextTurn();
      },
      playerHeals() {
        this.lastAction = `${this.getCurrentPlayer().name} heals`
        this.nextTurn();
      },
      playerDoSomethingSpecial() {
        this.lastAction = `${this.getCurrentPlayer().name} does something... special`
        this.nextTurn();
      },
      isSelected(playerId) {
        return playerId === this.currentPlayer
      },
      getCurrentPlayer() {
        return this.players[this.currentPlayer]
      },
      nextTurn() {
        this.currentPlayer = (++this.currentPlayer) % 3
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

  .combat-section {
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
    align-items: flex-start;
    padding: 0 15px;
  }
</style>
