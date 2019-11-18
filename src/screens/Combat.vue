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

  import createMonster from '../entities/monsterFactory'

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
          this.currentMonster = monsters.findIndex(({name}) => name === monster.name);
        }
      }
    },
    methods: {
      playerAttacks() {
        const player = this.getCurrentPlayer();
        const monster = this.getCurrentMonster();

        const playerDamage = player.attackMonster(monster)

        this.lastAction = `${player.name} dealt ${playerDamage} damage to ${monster.name}`;

        if (!this.isGameOver()) {
          this.monsterAttacks();
        }
      },
      playerHeals() {
        let manaCost = 20;
        if (this.checkMana(manaCost)) {
          const player = this.getCurrentPlayer();

          const playerHeal = player.heal();

          this.lastAction = `${player.name} heals ${playerHeal} hp`

          if (!this.isGameOver()) {
            this.monsterAttacks();
          }
        }
      },
      playerDoSomethingSpecial() {
        let manaCost = 40;
        if (this.checkMana(manaCost)) {
          const player = this.getCurrentPlayer();
          const monster = this.getCurrentMonster();

          let playerDamage = player.doSomethingSpecialToMonster(monster)

          this.lastAction = `${player.name} dealt ${playerDamage} damage to ${monster.name}`;

          if (!this.isGameOver()) {
            this.monsterAttacks();
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
        if (this.isGameOver()) {
          return false;
        }

        if (this.isCurrentPlayerAlive()) {
          this.getCurrentPlayer().setStatus('idle');
        }

        this.currentPlayer = (++this.currentPlayer) % this.heroes.length
        if (!this.isCurrentPlayerAlive()) {
          this.nextTurn();
        }
      },
      resetScene() {
        this.lastAction = ``;
        this.lastMonsterAction = ``;
      },
      resetHeroes() {
        for (let hero of this.heroes) {
          hero.reset();
        }
      },
      monsterAttacks() {
        this.isMonsterTurn = true;
        const monster = this.getCurrentMonster();

        setTimeout(() => {
          const {monsterDamage, target} = monster.attackRandomHero(this.heroes);

          this.lastAction = `${monster.name} dealt ${monsterDamage} damage to ${target.name}`;
          this.isMonsterTurn = false;
          this.nextTurn();
        }, 1500)
      },
      isCurrentPlayerAlive() {
        return this.getCurrentPlayer().isAlive();
      },
      isPartyAlive() {
        let aliveCount = 0;
        for (let hero of this.heroes) {
          if (hero.isAlive()) {
            aliveCount++;
          }
        }
        const isAnyoneIsAlive = aliveCount > 0;

        return isAnyoneIsAlive;
      },
      isGameOver() {
        const isMonsterDead = !this.getCurrentMonster().isAlive();
        const isEverybodyDead = !this.isPartyAlive();

        if (isMonsterDead) {
          this.declareVictory();
          return true;
        } else if (isEverybodyDead) {
          this.declareDefeat();
          return true;
        }
        return false;
      },
      declareVictory() {
        this.resetHeroes();

        const monster = this.getCurrentMonster();
        monster.setStatus('death');

        const nextMonsterIndex = this.currentMonster + 1;
        const noMonstersLeft = nextMonsterIndex === this.monsters.length;

        setTimeout(() => {
          router.push({
            name: noMonstersLeft ? 'gameover' : 'victory',
            params: {
              heroes: this.heroes,
              monster,
              nextMonster: noMonstersLeft ? null : monsters[nextMonsterIndex]
            }
          });
        }, 1500)
      },
      declareDefeat() {
        const monster = monsters[this.currentMonster];

        setTimeout(() => {
          router.push({
            name: 'defeat',
            params: {
              heroes: this.heroes,
              monster
            }
          });
        }, 1500)
      },
      checkMana(manaRequired) {
        if (this.getCurrentPlayer().mana.current < manaRequired) {
          this.lastAction = `${this.getCurrentPlayer().name} doesn't have enough Mana`
          this.lastMonsterAction = ``;
          return false;
        } else {
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
