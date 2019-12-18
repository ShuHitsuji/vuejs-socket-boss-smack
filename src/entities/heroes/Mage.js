import Hero from "../Hero.js"
import {getRandomValue} from "../../utils/numbers";

class Mage extends Hero {
  img = {
    idle: "mage.png",
    heal: "mage-heal.png",
    attack: "mage-attack.png",
    special: "mage-special.png",
    death: "mage-death.png",
  }

  name = "Mage"

  description = "Hechicero acólito proveniente del Pantano Meridional. De vestiduras y carácter modesto y discreto, este jóven prodigio dominó las artes de la piromancia a la temprana edad de 10. Adepto y experto en las antiguas artes arcanas, el poder de sus hechizos es capaz de hacerle frente a cualquier acero o metal (y cualquier contendiente/s que lo inhabite/n) que ose cruzársele. Héroe frágil pero con un asombroso poder destructivo, ideal para ofrecer soporte a distancia y controlar el campo de batalla si se lo protege."

  constructor({name, type}) {
    super({
      name,
      type,
      health: 150,
      attack: 80,
      mana: 100
    });
  }

  heal(heroes){
    let manaCost = 20;
    let calculateHealing = "the whole team";
    let minHeal = Math.round((this.health.max * 0.1) + (this.attack / 4));
    let maxHeal = Math.round((this.health.max * 0.25) + (this.attack / 4));
    let playerHeal = getRandomValue(minHeal, maxHeal);
    this.mana.current -= manaCost;
    for(let hero of heroes){
      hero.setStatus('heal');
      setTimeout(() => {
        hero.setStatus('idle');
      }, 800)
      if(hero.health.current > 0){
        if (hero.health.current + playerHeal > this.health.max) {
          hero.health.current = hero.health.max;
        } else {
          hero.health.current += playerHeal;
        }
      }else{
        hero.health.current = 1;
      }
    }
    return calculateHealing;
  }
}

export default Mage;
