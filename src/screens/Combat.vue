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
                   :status="{ health: monsters[currentMonster].health }"
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
  import Monster from '../entities/Monster'
  import ButtonsPanel from '../components/ButtonsPanel'
  import Hero from "../components/Hero/Hero";
  import Boss from "../components/Boss/Boss";

  const players = [
    new Player({
      name: 'Guille',
      type: 'ranger',
      health: 150,
      mana: 100,
      attack: 30
    }),
    new Player({
      name: 'Francho',
      type: 'knight',
      health: 200,
      mana: 100,
      attack: 20
    }),
    new Player({
      name: 'Axel',
      type: 'mage',
      health: 100,
      mana: 100,
      attack: 40
    })
  ]
  const monsters=[
    new Monster({
      name: 'Wisp',
      health: 500,
      attack: 25
    }),
    new Monster({
      name: 'Slime',
      health: 1000,
      attack: 15
    })
  ]

  export default {
    name: 'Combat',
    data: () => {
      return {
        players,
        monsters,
        currentMonster: 0,
        currentPlayer: 0,
        lastAction: ""
      }
    },
    methods: {
      playerAttacks() {
        if(this.checkAliveStatus()){
          let playerDamage = this.calculateDamage(this.getCurrentPlayer().attack / 2, this.getCurrentPlayer().attack);
          this.lastAction = `${this.getCurrentPlayer().name} dealt ${playerDamage} damage to ${this.getCurrentMonster().name}`;
          this.getCurrentMonster().health.current -= playerDamage;
          this.checkWin();
          this.monsterAttack();
        }
        this.nextTurn();
      },
      playerHeals() {
        let manaCost = 20;
        if(this.checkAliveStatus()){
          if(this.checkMana(manaCost)){
            let playerHeal = this.calculateDamage(this.getCurrentPlayer().attack / 2, this.getCurrentPlayer().attack);
            this.getCurrentPlayer().mana.current-=manaCost;
            if(this.getCurrentPlayer().health.current + playerHeal > this.getCurrentPlayer().health.max){
              this.getCurrentPlayer().health.current = this.getCurrentPlayer().health.max;
              let calculateHealing = playerHeal - (this.getCurrentPlayer().health.current - this.getCurrentPlayer().health.max);
              this.lastAction = `${this.getCurrentPlayer().name} heals ${calculateHealing} hp`
            }else{
              this.getCurrentPlayer().health.current += playerHeal;
              this.lastAction = `${this.getCurrentPlayer().name} heals ${playerHeal} hp`
            }
            this.monsterAttack();
            this.nextTurn();
          }         
        }else{
          this.nextTurn();
        } 
      },
      playerDoSomethingSpecial() {
        let manaCost = 40;
        if(this.checkAliveStatus()){
           if(this.checkMana(manaCost)){
              this.getCurrentPlayer().mana.current-=manaCost;
              let playerDamage = this.calculateDamage(this.getCurrentPlayer().attack, this.getCurrentPlayer().attack * 1.5);
              this.lastAction = `${this.getCurrentPlayer().name} dealt ${playerDamage} damage to ${this.getCurrentMonster().name}`;
              this.getCurrentMonster().health.current -= playerDamage;
              this.checkWin();
              this.monsterAttack();
              this.nextTurn();
            }
        }else{
          this.nextTurn();
        }
        
      },
      isSelected(playerId) {
        return playerId === this.currentPlayer
      },
      getCurrentPlayer() {
        return this.players[this.currentPlayer]
      },
      getCurrentMonster(){
        return this.monsters[this.currentMonster]
      },
      nextTurn() {
        this.currentPlayer = (++this.currentPlayer) % 3
      },
      nextMonster(){
        this.currentMonster = (++this.currentMonster) % monsters.length
      },
      monsterAttack(){
        let monsterDamage = this.calculateDamage(this.getCurrentMonster().attack, this.getCurrentMonster().attack * 2)
        this.getCurrentPlayer().health.current-= monsterDamage;
        if(this.getCurrentPlayer().health.current < 0){
          this.getCurrentPlayer().health.current = 0;
        }
      },
      calculateDamage(min,max){
            return Math.max(Math.floor(Math.random()*max)+1,min);
      },
      checkAliveStatus(){
        if(this.getCurrentPlayer().health.current > 1){
          return true;
        }else{
          return false;
        }
      },
      checkAliveParty(){
        var partyMembers = players.length;
        for(let i = 0; i < players.length; i++){
          if(players[i].health.current < 1){
            partyMembers--;
          }
        }
        if(partyMembers==0){
          return true;
        }
          return false;
      },
      checkWin(){
        if(this.getCurrentMonster().health.current <= 0){
            this.nextMonster();
        }else if(this.checkAliveParty()){
            return true;
        }   
            return false;
        },
      checkMana(manaRequiered){
          if(this.getCurrentPlayer().mana.current < manaRequiered){
              this.lastAction = `${this.getCurrentPlayer().name} doesn't have enough Mana`
              return false;
          }else{
              return true;
          }
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
