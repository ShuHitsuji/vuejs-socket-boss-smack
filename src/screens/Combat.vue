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
          <Boss :instance="monsters[currentMonster]" :selected="isMonsterTurn" />
        </div>
      </div>
    </section>
    <footer class="footer">
      <aside class="actions-area">
        <ButtonsPanel v-bind:style="{opacity: isMonsterTurn?0:1}" :disabled="isMonsterTurn" v-on:attack="playerAttacks" v-on:heal="playerHeals" v-on:special="playerDoSomethingSpecial"/>
      </aside>
      <main class="status-area">
        <StatusBar v-for="hero in players"
                   :key="hero.name"
                   :label="hero.name"
                   :status="{ health: hero.health, mana: hero.mana }"
                   :colors="{ health: '#8cdc07', mana: '#5a5adc' }"
        />
        <StatusBar :label="monsters[currentMonster].name"
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
      name: 'Elf',
      type: 'ranger',
      health: 175,
      mana: 100,
      attack: 50
    }),
    new Player({
      name: 'Knight',
      type: 'knight',
      health: 250,
      mana: 100,
      attack: 30
    }),
    new Player({
      name: 'Old Mage',
      type: 'mage',
      health: 150,
      mana: 100,
      attack: 70
    })
  ]
  const monsters=[
    new Monster({
      name: 'Wisp',
      health: 200,
      attack: 45,
      type: 'wisp'
    }),
    new Monster({
      name: 'Badass Slime',
      health: 525,
      attack: 25,
      type: 'slime'
    }),
    new Monster({
      name: 'Fishlett',
      health: 700,
      attack: 20,
      type: 'fish'
    }),
    new Monster({
      name: 'The hand',
      health: 999,
      attack: 25,
      type: 'tv'
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
        isMonsterTurn: false,
        lastAction: ""
      }
    },
    methods: {
      playerAttacks() {
          this.getCurrentPlayer().type.img= this.getCurrentPlayer().type.imgAttack;
          let playerDamage = this.calculateRng(this.getCurrentPlayer().attack / 2, this.getCurrentPlayer().attack);
          this.lastAction = `${this.getCurrentPlayer().name} dealt ${playerDamage} damage to ${this.getCurrentMonster().name}`;
          this.getCurrentMonster().health.current -= playerDamage;
          this.regenMana(10);
          if(!this.checkWin()){
              this.monsterAttack();
          }
        },
      playerHeals() {
        let manaCost = 20;
          if(this.checkMana(manaCost)){
              this.getCurrentPlayer().type.img= this.getCurrentPlayer().type.imgHeal;
              let minHeal = Math.round(this.getCurrentPlayer().health.max * 0.15);
              let maxHeal = Math.round((this.getCurrentPlayer().health.max * 0.15) + (this.getCurrentPlayer().attack / 2));
              let playerHeal = this.calculateRng(minHeal, maxHeal);
              this.getCurrentPlayer().mana.current -= manaCost;
              if(this.getCurrentPlayer().health.current + playerHeal > this.getCurrentPlayer().health.max){
                this.getCurrentPlayer().health.current = this.getCurrentPlayer().health.max;
                let calculateHealing = playerHeal - (this.getCurrentPlayer().health.current - this.getCurrentPlayer().health.max);
                this.lastAction = `${this.getCurrentPlayer().name} heals ${calculateHealing} hp`
              }else{
                this.getCurrentPlayer().health.current += playerHeal;
                this.lastAction = `${this.getCurrentPlayer().name} heals ${playerHeal} hp`
              }
              this.monsterAttack();
          }
      },
      playerDoSomethingSpecial() {
        let manaCost = 40;
           if(this.checkMana(manaCost)){
              this.getCurrentPlayer().type.img= this.getCurrentPlayer().type.imgAttack;
              this.getCurrentPlayer().mana.current -= manaCost;
              let playerDamage = this.calculateRng(this.getCurrentPlayer().attack, this.getCurrentPlayer().attack * 1.5);
              this.lastAction = `${this.getCurrentPlayer().name} dealt ${playerDamage} damage to ${this.getCurrentMonster().name}`;
              this.getCurrentMonster().health.current -= playerDamage;
              if(!this.checkWin()){
                this.monsterAttack();
              }
            }
      },
      isSelected(playerId) {
        return !this.isMonsterTurn && (playerId === this.currentPlayer)
      },
      getCurrentPlayer() {
        return this.players[this.currentPlayer]
      },
      getCurrentMonster(){
        return this.monsters[this.currentMonster]
      },
      nextTurn() {
        if(!this.checkAliveStatus()){
          this.getCurrentPlayer().type.img= this.getCurrentPlayer().type.imgDeath;
        }else{
          this.getCurrentPlayer().type.img= this.getCurrentPlayer().type.imgIdle;
        }
        this.checkWin();
        this.currentPlayer = (++this.currentPlayer) % 3
        if(!this.checkAliveParty() && !this.checkAliveStatus()){
          this.nextTurn();
        }
      },
      nextMonster(){
        this.currentMonster = ++this.currentMonster;
        this.lastAction = ``;
        this.lastMonsterAction = ``;
        if(this.currentMonster > this.monsters.length){
          window.location.reload();
        }
          for(let i = 0; i < players.length; i++){
            players[i].type.img = players[i].type.imgIdle;
            players[i].health.current = players[i].health.max;
            players[i].mana.current = players[i].mana.max;
          }
      },
      monsterAttack(){
        this.isMonsterTurn = true;
        setTimeout(() => {
          let monsterDamage = this.calculateRng(this.getCurrentMonster().attack, this.getCurrentMonster().attack * 2);
          let monsterTarget = this.calculateRng(0, players.length);
          if(!this.checkAliveParty() && this.players[monsterTarget - 1].health.current > 0){
            this.players[monsterTarget - 1].health.current -= monsterDamage;
            this.lastAction = `${this.getCurrentMonster().name} dealt ${monsterDamage} damage to ${this.players[monsterTarget - 1].name}`;
            if(this.players[monsterTarget - 1].health.current <= 0){
              this.players[monsterTarget - 1].health.current = 0;
              this.players[monsterTarget - 1].type.img = this.players[monsterTarget - 1].type.imgDeath;
            }
          }else if(!this.checkAliveParty()){
            this.monsterAttack();
          }
          this.isMonsterTurn = false;
          this.nextTurn();
        }, 1500)
      },
      calculateRng(min,max){
          return Math.max(Math.floor(Math.random() * max) + 1, min);
      },
      checkAliveStatus(){
        if(this.getCurrentPlayer().health.current > 0){
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
        if(partyMembers <= 0){
          return true;
        }
          return false;
      },
      checkWin(){
        if(this.getCurrentMonster().health.current <= 0){
            this.nextMonster();
            return true;
        }else if(this.checkAliveParty()){
            window.location.reload()
            return true;
        }
            return false;
        },
      checkMana(manaRequired){
          if(this.getCurrentPlayer().mana.current < manaRequired){
              this.lastAction = `${this.getCurrentPlayer().name} doesn't have enough Mana`
              this.lastMonsterAction = ``;
              return false;
          }else{
              return true;
          }
        },
        regenMana(mana){
          this.getCurrentPlayer().mana.current += mana;
          if(this.getCurrentPlayer().mana.current > this.getCurrentPlayer().mana.max){
            this.getCurrentPlayer().mana.current = this.getCurrentPlayer().mana.max;
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
    flex-direction: column;
  }
</style>
