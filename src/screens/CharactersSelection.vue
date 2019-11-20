<template>
  <div class="screen unselectable" draggable="false">
    <section class="characters-selection">
      <h1 class="title">Bienvenidos al combate</h1>
      <h2 class="subtitle">Elijan sus personajes</h2>
      <div class="characters-container">
        <div class="character"
             v-for="hero in heroes"
             :key="hero.type"
             v-on:click="showHeroDescription(hero)"
        >
          <drop @drop="(player) => { handleDrop(player, hero.type); }">
            <div class="selectors">
              <div v-for="selector in droppables[hero.type]"
                   :key="selector"
                   class="selector"></div>
            </div>
            <Hero :instance="hero"/>
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
        <button class="transparent-button" v-on:click="displayTutorial()">

          <i>info</i>
        </button>
      </aside>
      <main class="description">
        <div class="info" v-html="info"/>
      </main>
      <nav class="start">
        <button class="start-button">
          <i class="arrow left" v-on:click="startCombat()"></i>
        </button>
      </nav>
    </footer>
  </div>
</template>

<script>
  import createHero from '../entities/heroFactory'
  import Hero from '../components/Hero/Hero'
  import {Drag, Drop} from 'vue-drag-drop';
  import {router} from '../router'

  const heroes = {
    ranger: createHero({type: 'ranger'}),
    knight: createHero({type: 'knight'}),
    mage: createHero({type: 'mage'})
  }

  export default {
    name: 'CharactersSelection',
    data: () => {
      let tutorial = 'Para selección, arrastrar los puntos sobre los personajes.<br />';
      tutorial += 'Click sobre un personaje para ver su descripción.';

      return {
        heroes,
        selectedHero: null,
        draggables: [1, 2, 3], // player numbers
        droppables: {
          ranger: [],
          knight: [],
          mage: [],
        },
        tutorial,
        info: ''
      }
    },
    created: function () {
      this.displayTutorial()
    },
    methods: {
      displayTutorial() {
        this.setCurrentInfo(this.tutorial, 'Tutorial')
      },
      handleDrop(playerNumber, type) {
        this.droppables[type].push(playerNumber);
        this.draggables = this.draggables.filter(number => number !== playerNumber);
        const hero = this.heroes[type];

        this.showHeroDescription(hero)
      },
      showHeroDescription(hero) {
        this.setCurrentInfo(hero.getDescription(), 'Descripción')
      },
      setCurrentInfo(info, title = "") {
        if (title) {
          title = `<h3>${title}</h3>`
        }
        this.info = title + info
      },
      startCombat() {
        const selection = []
        Object.entries(this.droppables).forEach(([type, marks]) => {
          marks.forEach(() => {
            selection.push(type)
          })
        })

        if (selection.length < 3) {
          this.setCurrentInfo("Selecciona al menos 3 personajes, arrastrando y soltando los puntos.", "Olvidaste algo...");
        } else {
          const heroes = selection.map((type) => createHero({type}))
          router.push({name: 'combat', params: { heroes }})
        }
      }
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

  .unselectable {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
    height: 15px;
    width: 15px;
    margin: 15px;
  }

  .footer {
    display: flex;
    min-height: 280px;
    background: #333;
    justify-content: space-between;
  }

  .tutorial {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 300px;
  }

  .transparent-button {
    border: none;
    outline: none;
    background: none;
    color: #bfb8b9;
    font-family: PressStart;
    cursor: pointer;
  }

  .description {
    flex: 2;
    padding: 10px;
  }

  .info {
    color: white;
    font-family: PressStart;
    font-size: 12px;
    line-height: 17px;
  }

  .info >>> h3,
  .info >>> b {
    color: rgba(249, 255, 76, 0.55);
  }

  .start {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 300px;
  }

  .start-button {
    display: block;
    width: 100px;
    height: 100px;
    background: none;
    border: none;
    cursor: pointer;
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
