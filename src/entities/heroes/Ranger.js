import Hero from "../Hero.js"
import {getRandomValue} from "../../utils/numbers";

class Ranger extends Hero {
  img = {
    idle: "ranger.png",
    heal: "ranger-heal.png",
    attack: "ranger-attack.png",
    special: "ranger-special.png",
    death: "ranger-death.png",
  }

  name = "Ranger"

  description = "Elfa guardabosques de los bosques de Jaspe. Armada con un arco bendecido por la diosa Elune misma, el refulgiente acero élfico de sus flechas es lo último que ven (y sienten) aquellos que osan desafiarla. De armadura ligera, los elfos consideran el metal como una debilidad de la cual disponer, prefiriendo emplear su agilidad preternatural para esquivar los golpes de sus adversarios. Un héroe con gran evasión y gran daño sostenido en el tiempo."

  constructor({name, type}) {
    super({
      name,
      type,
      health: 125,
      attack: 65,
      mana: 120
    });
  }

  receiveDamage(amount) {
    let chanceOfDodge = getRandomValue(0,10)
    if(chanceOfDodge > 4){
        this.health.current -= amount;
    }else{
        amount = 0;
    }
    
    if (!this.isAlive()) {
      this.setStatus('death');
      this.health.current = 0;
    }
    return amount;
  }
}

export default Ranger;
