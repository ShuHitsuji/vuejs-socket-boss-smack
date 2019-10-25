<template>
  <div class="screen">
    <section class="combat-section">
      <div class="players-area">
        <div class="column left">
          <div class="character">
            <img alt="character" src="../assets/characters/mage-hero.png" />
          </div>
        </div>
        <div class="column right">
          <div class="character">
            <img alt="character" src="../assets/characters/mage-hero-healing.png" />
          </div>
          <div class="character">
            <img alt="character" src="../assets/characters/mage-hero-damaged.png" />
          </div>
        </div>
      </div>
      <div class="monster-area">
        <div class="monster">
          <img alt="boss" src="../assets/characters/Boss-nr1.png" />
        </div>
      </div>
    </section>
    <footer class="footer">
      <aside class="actions-area">
        <div class="buttons-container">
          <Button label="Ataque" v-on:click="ataque"/>
          <Button label="Curación" />
          <Button label="Acción especial" />
        </div>
      </aside>
      <main class="status-area">
        <StatusBar label="Player 1" status="90/100" color="#5a5adc" />
        <StatusBar label="Player 2" status="75/100" color="#5a5adc" />
        <StatusBar label="Player 3" status="67/100" color="#5a5adc" />
        <StatusBar label="Player 4" status="230/400" color="red" />
      </main>
      <nav class="bard-area">
      </nav>
    </footer>
  </div>
</template>

<script>
import Button from '../components/Button.vue'
import StatusBar from "../components/StatusBar";

methods:{
  ataque:function(){
    this.StatusBar.status = "100/100"
  }
}

export default {
  name: 'Combat',
  components: {
    StatusBar,
    Button
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

  .buttons-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
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
