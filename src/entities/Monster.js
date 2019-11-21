import {getRandomValue} from "../utils/numbers";

class Monster {
  status = 'idle'
  img = {}

  constructor({name, health, attack, type}) {
    this.name = name;
    this.health = {
      max: health,
      current: health
    }
    this.type = type;
    this.attack = attack;
  }

  setStatus(status) {
    if (status === 'death') {
      this.health.current = 0
    }
    this.status = status
  }

  isAlive() {
    return this.status !== 'death' && this.health.current > 0;
  }

  getImage() {
    return this.img[this.status];
  }

  reset() {
    this.setStatus('idle');
    this.health.current = this.health.max;
  }

  receiveDamage(amount) {
    this.health.current -= amount;

    if (!this.isAlive()) {
      this.setStatus('death');
      this.health.current = 0;
    }
  }

  attackRandomHero(heroes) {
    this.setStatus('attack');
    setTimeout(() => {
      this.setStatus('idle');
    }, 800)
    let target = this.chooseRandomVictim(heroes);
    let monsterDamage = getRandomValue(this.attack, this.attack * 2);

    target.receiveDamage(monsterDamage);

    return {
      monsterDamage,
      target
    }
  }

  chooseRandomVictim(heroes) {
    const min = 0;
    const max = heroes.length - 1;
    const index = getRandomValue(min, max)

    return (heroes[index].isAlive()) ? heroes[index] : this.chooseRandomVictim(heroes)
  }
}

  export default Monster;
