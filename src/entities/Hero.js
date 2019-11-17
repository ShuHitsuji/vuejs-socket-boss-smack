import {getRandomValue} from "../utils/numbers";

class Hero {
  status = 'idle'
  img = {}
  description = ''

  constructor({name, type, health, attack, mana}) {
    this.name = name;
    this.keyName = type;
    this.type = type;
    this.health = {
      max: health,
      current: health
    }
    this.mana = {
      max: mana,
      current: mana
    }
    this.attack = attack;
  }

  isAlive() {
    return this.health.current > 0;
  }

  setStatus(status) {
    this.status = status
  }

  receiveDamage(amount) {
    this.health.current -= amount;

    if (!this.isAlive()) {
      this.health.current = 0;
      this.setStatus('death');
    }
  }

  attackMonster(monster) {
    this.setStatus('attack');
    setTimeout(() => {
      this.setStatus('idle');
    }, 500)

    let playerDamage = getRandomValue(this.attack / 2, this.attack);
    monster.receiveDamage(playerDamage);

    this.regenerateMana()

    return playerDamage;
  }

  healMyselft(){
    let manaCost = 20;
    let calculateHealing = 0;
      
    this.setStatus('heal');
    setTimeout(() => {
      this.setStatus('idle');
    }, 800)

    this.mana.current -= manaCost;
    let minHeal = Math.round(this.health.max * 0.15);
    let maxHeal = Math.round((this.health.max * 0.15) + this.attack);

    let playerHeal = getRandomValue(minHeal, maxHeal);

    if (this.health.current + playerHeal > this.health.max) {
      this.health.current = this.health.max;
      calculateHealing = playerHeal - (this.health.current - this.health.max);
    } else {
      this.health.current += playerHeal;
      calculateHealing = playerHeal;
    }

    return calculateHealing;
  }
  
  doSomethingSpecialToMonster(monster) {
    let manaCost = 40;

    this.setStatus('special');
    setTimeout(() => {
      this.setStatus('idle');
    }, 800)

    this.mana.current -= manaCost;
    let playerDamage = getRandomValue(this.attack, this.attack * 1.5);
    monster.receiveDamage(playerDamage);

    return playerDamage;
  }

  regenerateMana() {
    this.mana.current += 10;
    if (this.mana.current > this.mana.max) {
      this.mana.current = this.mana.max;
    }
  }

  getImage() {
    return this.img[this.status]
  }

  reset() {
    this.setStatus('idle');
    this.health.current = this.health.max;
    this.mana.current = this.mana.max;
  }

  getDescription() {
    let description = this.description;
    description += `<br /><br />`;
    description += `<b>Salud</b>: ${this.health.max} <br />`;
    description += `<b>Ataque</b>: ${this.attack} <br />`;
    description += `<b>Mana</b>: ${this.mana.max} <br />`;

    return description
  }
}

export default Hero;
