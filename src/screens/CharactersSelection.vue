<template>
  <div class="screen">
    <section class="characters-selection">
      <h1 class="title">Bienvenidos al combate</h1>
      <h2 class="subtitle">Elijan sus personajes</h2>
      <div class="characters-container">
        <div class="character"
             v-for="hero in heroes"
             :key="hero.keyName"
             v-on:click="setCurrentInfo(hero.getDescription())"
        >
          <drop @drop="(player) => { handleDrop(player, hero.keyName); }">
            <div class="selectors">
              <div v-for="selector in droppables[hero.keyName]"
                   :key="selector"
                   class="selector"></div>
            </div>
            <Hero :instance="hero" />
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
        <i v-on:click="setCurrentInfo(tutorial)">i</i>
      </aside>
      <main class="description">
        <pre class="info">{{ info }}</pre>
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

const charDescs = {
  knight: "Caballero errante oriundo de las tierras de Astora. Protegido por una armadura de diamantina reforjada, espada de veraplata, y un escudo de oricalco pulido. Su identidad permanece un misterio, pero sus habilidades en combate son formidables. Un héroe duradero, ideal para las líneas delanteras de cualquier pandilla de aventureros que se consideren a sí mismos serios (y precavidos).",
  ranger: "Elfa guardabosques de los bosques de Jaspe. Armada con un arco bendecido por la diosa Elune misma, el refulgiente acero élfico de sus flechas es lo último que ven (y sienten) aquellos que osan desafiarla. De armadura ligera, los elfos consideran el metal como una debilidad de la cual disponer, prefiriendo emplear su agilidad preternatural para esquivar los golpes de sus adversarios. Un héroe con gran evasión y gran daño sostenido en el tiempo.",
  mage: "Hechicero acólito proveniente del Pantano Meridional. De vestiduras y carácter modesto y discreto, este jóven prodigio dominó las artes de la piromancia a la temprana edad de 10. Adepto y experto en las antiguas artes arcanas, el poder de sus hechizos es capaz de hacerle frente a cualquier acero o metal (y cualquier contendiente/s que lo inhabite/n) que ose cruzársele. Héroe frágil pero con un asombroso poder destructivo, ideal para ofrecer soporte a distancia y controlar el campo de batalla si se lo protege."
}

export default {
  name: 'CharactersSelection',
  data: () => {
    const tutorial = `Para selección, arrastrar los puntos sobre los personajes.
Click sobre un personaje para ver su descripción.`

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
      info: tutorial
    }
  },
  methods: {
    handleDrop(playerNumber, type) {
      console.log(playerNumber, type)
      this.droppables[type].push(playerNumber);
      this.draggables = this.draggables.filter(number => number !== playerNumber);
      const hero = this.heroes[type];
      this.setCurrentInfo(hero.getDescription())
    },
    setCurrentInfo(info) {
      this.info = info
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
  }

  .info {
    color: white;
    font-family: PressStart;
    font-size: 12px;
    line-height: 16px;
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
