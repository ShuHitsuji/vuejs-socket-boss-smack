<template>
  <div class="screen">
    <section class="combat-section">
      <div class="players-area">
        <div class="column left">
          <div class="character">
            <img class="character-img" alt="character" src="../assets/characters/mage-hero.png" />
          </div>
        </div>
        <div class="column right">
          <div class="character">
            <img class="knight-img" alt="character" src="../assets/characters/knight.png" />
          </div>
          <div class="character">
            <img class="character-img" alt="character" src="../assets/characters/mage-hero-damaged.png" />
          </div>
        </div>
      </div>
      <div class="monster-area">
        <div class="monster">
          <img class="boss-img" alt="boss" src="../assets/characters/spectre base.png" />
        </div>
      </div>
    </section>
    <footer class="footer">
      <aside class="actions-area">
        <ButtonsPanel v-on:attack="playerAttacks" v-on:heal="playerHeals" v-on:special="playerDoSomethingSpecial" />
      </aside>
      <main class="status-area">
        <StatusBar v-for="player in players"
                   :key="player.name"
                   :label="player.name"
                   :status="{ health: player.health, mana: player.mana }"
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

export default {
  name: 'Combat',
  data: () => {
    return {
      players: [
        new Player({
          name: 'Guille',
          type: 'ranger',
          health: 150,
          mana: 60,
          attack: 60
        }),
        new Player({
          name: 'Francho',
          type: 'warrior',
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
      ],
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

  .character-img {
    width:77px;
    height:77px;
  }

  .knight-img {
    width:90px;
    height:90px;
  }

  .boss-img {
    width:128px;
    height:128px;
  }
</style>
