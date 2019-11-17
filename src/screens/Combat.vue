<template>
  <div class="screen">
    <header class="header">
      <h1 class="title">Boss Smack</h1>
    </header>
    <section class="combat-section">
      <div class="heroes-area">
        <div class="column left">
          <div class="character">
            <Hero :instance="heroes[0]" :selected="isSelected(0)"/>
          </div>
        </div>
        <div class="column right">
          <div class="character">
            <Hero :instance="heroes[1]" :selected="isSelected(1)"/>
          </div>
          <div class="character">
            <Hero :instance="heroes[2]" :selected="isSelected(2)"/>
          </div>
        </div>
      </div>
      <div class="monster-area">
        <div class="monster">
          <Boss :instance="monsters[currentMonster]" :selected="isMonsterTurn"/>
        </div>
      </div>
    </section>
    <footer class="footer">
      <aside class="actions-area">
        <ButtonsPanel v-bind:style="{opacity: isMonsterTurn?0.35:1}" :disabled="isMonsterTurn"
                      v-on:attack="playerAttacks" v-on:heal="playerHeals" v-on:special="playerDoSomethingSpecial"/>
      </aside>
      <main class="status-area">
        <StatusBar v-for="(hero, index) in heroes"
                   :key="index"
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
  import {router} from '../router'

  import StatusBar from "../components/StatusBar";

  import createHero from '../entities/heroFactory'

  import createMonster from  '../entities/monsterFactory'

  import ButtonsPanel from '../components/ButtonsPanel'
  import Hero from "../components/Hero/Hero";
  import Boss from "../components/Boss/Boss";

  const monsters = [
    createMonster({type: 'wisp'}),
    createMonster({type: 'slime'}),
    createMonster({type: 'fish'}),
    createMonster({type: 'tv'})
  ]

  const defaultHeroes = [
    createHero({name: 'Elf', type: 'ranger'}),
    createHero({name: 'Knight', type: 'knight'}),
    createHero({name: 'Mage', type: 'mage'})
  ]

  export default {
    name: 'Combat',
    data: () => {
      return {
        heroes: [],
        monsters,
        currentMonster: 0,
        currentPlayer: 0,
        isMonsterTurn: false,
        lastAction: ""
      }
    },
    created: function () {
      const {heroes, monster} = this.$route.params;

      if (!heroes) {
        // default mode, one of a kind
        this.heroes = defaultHeroes;
      } else {
        this.heroes = heroes;

        this.resetScene();
        this.resetHeroes();

        if (monster) {
          this.currentMonster = monsters.indexOf(monster);
        }
      }
    },
    methods: {
      playerAttacks() {
        this.getCurrentPlayer().setStatus('attack');
        setTimeout(() => {
          this.getCurrentPlayer().setStatus('idle');
        }, 500)
        let playerDamage = this.calculateRng(this.getCurrentPlayer().attack / 2, this.getCurrentPlayer().attack);
        this.lastAction = `${this.getCurrentPlayer().name} dealt ${playerDamage} damage to ${this.getCurrentMonster().name}`;
        this.getCurrentMonster().health.current -= playerDamage;
        this.regenMana(10);
        if (!this.checkWin()) {
          this.monsterAttack();
        }
      },
      playerHeals() {
        let manaCost = 20;
        if (this.checkMana(manaCost)) {
          this.getCurrentPlayer().setStatus('heal');
          setTimeout(() => {
            this.getCurrentPlayer().setStatus('idle');
          }, 800)
          let minHeal = Math.round(this.getCurrentPlayer().health.max * 0.15);
          let maxHeal = Math.round((this.getCurrentPlayer().health.max * 0.15) + (this.getCurrentPlayer().attack / 2));
          let playerHeal = this.calculateRng(minHeal, maxHeal);
          this.getCurrentPlayer().mana.current -= manaCost;
          if (this.getCurrentPlayer().health.current + playerHeal > this.getCurrentPlayer().health.max) {
            this.getCurrentPlayer().health.current = this.getCurrentPlayer().health.max;
            let calculateHealing = playerHeal - (this.getCurrentPlayer().health.current - this.getCurrentPlayer().health.max);
            this.lastAction = `${this.getCurrentPlayer().name} heals ${calculateHealing} hp`
          } else {
            this.getCurrentPlayer().health.current += playerHeal;
            this.lastAction = `${this.getCurrentPlayer().name} heals ${playerHeal} hp`
          }
          if (!this.checkWin()) {
            this.monsterAttack();
          }
        }
      },
      playerDoSomethingSpecial() {
        let manaCost = 40;
        if (this.checkMana(manaCost)) {
          this.getCurrentPlayer().setStatus('special');
          setTimeout(() => {
            this.getCurrentPlayer().setStatus('idle');
          }, 800)
          this.getCurrentPlayer().mana.current -= manaCost;
          let playerDamage = this.calculateRng(this.getCurrentPlayer().attack, this.getCurrentPlayer().attack * 1.5);
          this.lastAction = `${this.getCurrentPlayer().name} dealt ${playerDamage} damage to ${this.getCurrentMonster().name}`;
          this.getCurrentMonster().health.current -= playerDamage;
          if (!this.checkWin()) {
            this.monsterAttack();
          }
        }
      },
      isSelected(playerId) {
        return !this.isMonsterTurn && (playerId === this.currentPlayer)
      },
      getCurrentPlayer() {
        return this.heroes[this.currentPlayer]
      },
      getCurrentMonster() {
        return this.monsters[this.currentMonster]
      },
      nextTurn() {
        if (!this.checkAliveStatus()) {
          this.getCurrentPlayer().setStatus('death');
        } else {
          this.getCurrentPlayer().setStatus('idle');
        }
        this.checkWin();
        this.currentPlayer = (++this.currentPlayer) % this.heroes.length
        if (!this.checkAliveParty() && !this.checkAliveStatus()) {
          this.nextTurn();
        }
      },
      resetScene() {
        this.lastAction = ``;
        this.lastMonsterAction = ``;
      },
      resetHeroes() {
        for (let i = 0; i < this.heroes.length; i++) {
          this.heroes[i].setStatus('idle');
          this.heroes[i].health.current = this.heroes[i].health.max;
          this.heroes[i].mana.current = this.heroes[i].mana.max;
        }
      },
      monsterAttack() {
        this.isMonsterTurn = true;
        setTimeout(() => {
          let monsterDamage = this.calculateRng(this.getCurrentMonster().attack, this.getCurrentMonster().attack * 2);
          this.calculateMonsterTarget(monsterDamage);
          this.isMonsterTurn = false;
          this.nextTurn();
        }, 1500)
      },
      calculateMonsterTarget(monsterDamage) {
        let monsterTarget = this.calculateRng(0, this.heroes.length);
        if (!this.checkAliveParty() && this.heroes[monsterTarget - 1].isAlive()) {
          this.heroes[monsterTarget - 1].health.current -= monsterDamage;
          this.lastAction = `${this.getCurrentMonster().name} dealt ${monsterDamage} damage to ${this.heroes[monsterTarget - 1].name}`;
          if (!this.heroes[monsterTarget - 1].isAlive()) {
            this.heroes[monsterTarget - 1].health.current = 0;
            this.heroes[monsterTarget - 1].setStatus('death');
          }
        } else if (!this.checkAliveParty()) {
          this.calculateMonsterTarget(monsterDamage);
        }
      },
      calculateRng(min, max) {
        return Math.max(Math.floor(Math.random() * max) + 1, min);
      },
      checkAliveStatus() {
        return this.getCurrentPlayer().isAlive();
      },
      checkAliveParty() {
        let partyMembers = this.heroes.length;
        for (let i = 0; i < this.heroes.length; i++) {
          if (!this.heroes[i].isAlive()) {
            partyMembers--;
          }
        }
        if (partyMembers <= 0) {
          return true;
        }
        return false;
      },
      checkWin() {
        const isMonsterDead = !this.getCurrentMonster().isAlive();

        if (isMonsterDead) {
          this.declareVictory();
          return true;
        } else if (this.checkAliveParty()) {
          window.location.reload()
        }
        return false;
      },
      declareVictory() {
        const monster = monsters[this.currentMonster];
        monster.setStatus('death');

        const nextMonsterIndex = this.currentMonster + 1;
        if (nextMonsterIndex > this.monsters.length) {
          // TODO: real end screen
          window.location.reload();
        }

        setTimeout(() => {
          router.push({
            name: 'victory',
            params: {
              heroes: this.heroes,
              monster,
              nextMonster: monsters[nextMonsterIndex]
            }
          });
        }, 1200)
      },
      checkMana(manaRequired) {
        if (this.getCurrentPlayer().mana.current < manaRequired) {
          this.lastAction = `${this.getCurrentPlayer().name} doesn't have enough Mana`
          this.lastMonsterAction = ``;
          return false;
        } else {
          return true;
        }
      },
      regenMana(mana) {
        this.getCurrentPlayer().mana.current += mana;
        if (this.getCurrentPlayer().mana.current > this.getCurrentPlayer().mana.max) {
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

  .combat-section {
    flex: 1;
    width: 100%;
    display: flex;
    background: #555;
    padding-top: 10px;
  }

  .heroes-area {
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
    color: rgba(249, 255, 76, 0.55);
  }
</style>
